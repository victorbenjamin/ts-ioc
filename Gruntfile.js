module.exports = function (grunt) {

  grunt.initConfig({

    clean: {
      test: ['build-test/'],
    },

    typescript: {

      base: {
        src: ['test/**/*.ts', 'src/**/*.ts'],
        dest: 'build-test/',
        options: {
          module: 'commonjs',
          target: 'es5',
          noImplicitAny: false,
          sourceMap: true,
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
          references: 'typings/**/*.d.ts',
        },

      },
    },

    mochaTest: {
      test: {
        src: ['build-test/**/*.js'],
      },
    },

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', ['clean:test', 'typescript', 'mochaTest:test']);

  grunt.registerTask('default', 'test');

};