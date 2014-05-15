module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      build: {
        src: '<%= pkg.name %>.js',
        dest: '<%= pkg.name %>.min.js'
      }
    },

    jshint: {
      files: ['<%= pkg.name %>.js']
    },

    watch: {

      scripts: {
        files: ['<%= pkg.name %>.js'],
        tasks: ['jshint', 'uglify'],
        options: {
          spawn: false,
        }
      },

      grunt: {
        files: ['Gruntfile.js', 'package.json'],
        tasks: ['jshint']
      }
    }

  });

  require('load-grunt-tasks')(grunt);
  grunt.registerTask('default', ['watch']);
};