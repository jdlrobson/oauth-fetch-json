// jscs:disable jsDoc
/*jshint node:true, strict:false */
module.exports = function ( grunt ) {
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig( {
    jshint: {
      options: {
        jshintrc: true
      },
      all: [
        'index.js',
      ],
    }
  } );

  grunt.registerTask( 'test', [ 'jshint' ] );
};
