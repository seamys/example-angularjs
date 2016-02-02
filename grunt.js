module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        lint: {
            files: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
        },
        watch: {
            files: '<config:lint.files>',
            tasks: 'default'
        },
        jshint: {
            options: {
                asi: true,
                laxcomma: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                node: true,
                "strict": false,
                "predef": [
                    "describe", // Used by mocha
                    "it", // Used by mocha
                    "before", // Used by mocha
                    "beforeEach", // Used by mocha
                    "after", // Used by mocha
                    "afterEach"      // Used by mocha
                ]
            },
            globals: {
                exports: true
            }
        },
        simplemocha: {
            all: {
                src: 'test/**/*_test.js',
                options: {
                    globals: ['should'],
                    timeout: 3000,
                    ignoreLeaks: false,
                    ui: 'bdd',
                    reporter: 'spec'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-simple-mocha');

    // Default task.
    grunt.registerTask('default', 'simplemocha');

    // override the default test target
    grunt.registerTask('test', 'simplemocha');
};