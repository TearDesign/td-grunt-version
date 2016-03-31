/*
 * td-grunt-version
 * https://github.com/teardesign/grunt-assets-version-replace
 *
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    var version = Number(new Date());

    grunt.registerMultiTask('assets_versioning', 'Version your assets', function () {

        var self = this;

        var pattern = this.data.pattern ? this.data.pattern : 'versioning_';

        for (var k in this.data.replace_in) {

            var types = self.data.file_types;
            for (var t in types) types[t] = "." + types[t];
            types = types.join("|");

            var find = new RegExp("([href|src][=])([\\\"|\\\'])(.*\\\." + pattern + ")(\\\d+)(" + types + ")([\\\"|\\\'])", "g");

            var pageData = grunt.file.read(this.data.replace_in[k]);

            var fileNames = [];
            var fileNamesNoVersion = [];
            var fileNamesVersion = [];

            var match = find.exec(pageData);
            while (match != null) {
                fileNames.push(match[3] + match[4] + match[5]);
                fileNamesNoVersion.push(match[3].replace("." + pattern, '') + match[5]);
                fileNamesVersion.push(match[3] + version + match[5]);
                match = find.exec(pageData);
            }

            // adds version
            fileNames.forEach(function (fn, i) {
                pageData = pageData.replace(fn, fileNamesVersion[i]);
            });

            if (grunt.file.write(k, pageData)) {
                grunt.log.success('versions updated, now copying files :)');
            } else {
                grunt.log.error('versions updated failed...');
            }

            var filesToCopy = {};

            fileNamesNoVersion.forEach(function (f, i) {
                filesToCopy['c' + String(i)] = {
                    files: [{
                        cwd: '',
                        src: grunt.file.expand(self.data.base_dir + "/**/" + fileNamesNoVersion[i].split('/').pop()),
                        dest: self.data.base_dir + 'dist/' + fileNamesVersion[i].split('/').pop(),
                    }]
                };
            });

            grunt.config('clean', {
                all: {
                    files: [{
                        dot: true,
                        src: [
                            self.data.base_dir + 'dist/*'
                        ]
                    }]
                }
            });
            grunt.config('copy', filesToCopy);

            grunt.task.run(['clean', 'copy']);

        }

    });

};
