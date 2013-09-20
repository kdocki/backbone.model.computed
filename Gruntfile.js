module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    watch: {
      livereload: {
        files: ['src/*.js', 'test/*.js'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('default', 'watch');
}
