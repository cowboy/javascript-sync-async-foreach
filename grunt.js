/*global config:true, task:true*/
config.init({
  meta: {
    name: 'javascript-sync-async-foreach',
    title: 'JavaScript Sync/Async forEach',
    version: '0.1.2',
    description: 'An optionally-asynchronous forEach with an interesting interface.',
    homepage: 'http://github.com/cowboy/javascript-sync-async-foreach',
    author: '"Cowboy" Ben Alman',
    license: ['MIT', 'GPL'],
    copyright: 'Copyright (c) 2011 "Cowboy" Ben Alman',
    repository: 'git://github.com/cowboy/javascript-sync-async-foreach.git',
    banner: '/* {{meta.title}} - v{{meta.version}} - {{today "m/d/yyyy"}}\n' +
            ' * {{meta.homepage}}\n' + 
            ' * {{{meta.copyright}}}; Licensed {{join meta.license}} */'
  },
  concat: {
    'dist/ba-foreach.js': ['<banner>', '<file_strip_banner:lib/foreach.js>']
  },
  min: {
    'dist/ba-foreach.min.js': ['<banner>', 'dist/ba-foreach.js']
  },
  test: {
    files: ['test/**/*.js']
  },
  lint: {
    files: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
  },
  watch: {
    files: '<config:lint.files>',
    tasks: 'lint:files test:files'
  },
  jshint: {
    options: {
      curly: true,
      eqeqeq: true,
      immed: true,
      latedef: true,
      newcap: true,
      noarg: true,
      sub: true,
      undef: true,
      eqnull: true
    },
    globals: {
      exports: true
    }
  },
  uglify: {}
});

// Default task.
task.registerTask('default', 'lint:files test:files concat min');
