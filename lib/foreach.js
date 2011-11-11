/*!
 * Sync/Async forEach
 * http://benalman.com/
 *
 * Copyright (c) 2011 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

(function(exports) {

  // Iterate synchronously or asynchronously.
  exports.forEach = function(arr, eachFn, doneFn) {
    var len = arr.length;
    var i = 0;

    // This IIFE is called once now, and then again, by name, for each loop
    // iteration.
    (function next(result) {
      // The async.async flag will be set to true if `this.async` is called
      // inside the `eachFn` callback. A few other properties will be maintained
      // as well, in order to handle the edge-case where the `this.async` done
      // function is called synchronously.
      var async = {};
      // Was false returned from the `eachFn` callback or passed to the
      // `this.async` done function?
      var abort = result === false;

      // Exit if result passed to `this.async` done function or returned from
      // the `eachFn` callback was false, or when done iterating.
      if (abort || i === len) {
        // If a `doneFn` callback was specified, invoke that now. Pass in a
        // boolean value representing "not aborted" state along with the array.
        if (doneFn) {
          doneFn(!abort, arr);
        }
        return;
      }

      // Invoke the `eachFn` callback, setting `this` inside the callback to a
      // custom object that contains one method, and passing in the array item,
      // index, and the array.
      result = eachFn.call({
        // If `this.async` is called inside the `eachFn` callback, set the async
        // flag and return a function that can be used to continue iterating.
        async: function() {
          async.async = true;
          // If, for some crazy reason, the `this.async` done function is called
          // synchronously, explicitly set the async flag to false and store a
          // result value that will be used to override the result returned from
          // the `eachFn` callback. Otherwise just call `next`.
          return function(result) {
            if (async.done) {
              next(result);
            } else {
              async.async = false;
              async.result = result;
            }
          };
        }
      }, arr[i], i, arr);

      // Override the `eachFn` result if the `this.async` done function was
      // called synchronously.
      if (async.async === false) {
        result = async.result;
      }

      // `eachFn` has finished executing. If the `this.async` done function
      // executes after this point, it must be asynchronous.
      async.done = true;

      // Increment counter.
      i++;

      // If the async flag wasn't set, continue by calling `next` synchronously,
      // passing in the result of the `eachFn` callback.
      if (!async.async) {
        next(result);
      }
    }());
  };

}(typeof exports === "object" && exports || this));