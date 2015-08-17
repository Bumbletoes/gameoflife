module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['bower_components/jQuery/dist/jquery.js','src/Config.js','src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },

    compass: {                  // Task
        dist: {                   // Target
          options: {              // Target options
            sassDir: 'sass',
            cssDir: 'css',
            environment: 'production'
          }
        },
      dev: {                    // Another target
        options: {
          sassDir: 'sass',
          cssDir: 'css'
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 9001
        }
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['default'],
      options: {
        livereload:9001  
      }
    }
  });

grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-compass');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-watch');


grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'compass']);
grunt.registerTask('serve', ['concat', 'compass', 'connect', 'watch']);

};
