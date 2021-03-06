/*
 * td-grunt-version
 * https://github.com/teardesign/grunt-assets-version-replace
 *
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    'use strict';

    require('./tasks/index.js')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        assets_versioning: {
            version: {
                file_types: ['css', 'js'],
                pattern: 'versioning_',
                version: 'test',
		base_dir: 'test/',
                search_in: [
                    'test/index.html'
                ]
            }
        },

        mochaTest: {
            test: {
                default: {
                    reporter: 'spec',
                    timeout: 60000,
                },
                file_types: ['js']
            }
        }

    });

    grunt.registerTask('default', [
        'assets_versioning'
    ]);


    grunt.registerTask('test', [
        'mochaTest'
    ]);

};
