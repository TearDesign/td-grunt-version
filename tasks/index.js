/*
 * grunt-version-pattern-replace
 * https://github.com/teardesign/grunt-assets-version-replace
 *
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-copy');

    var version = Number(new Date());

    console.log("New version:", version);

    grunt.registerMultiTask('assets_versioning', 'Version your assets', function () {

        var self = this;

        var pattern = this.data.pattern ? this.data.pattern : 'versioning_';

        this.data.search_in.forEach(function (f) {

            var types = self.data.file_types;
            for (var t in types) types[t] = "." + types[t];
            types = types.join("|");

            var find = new RegExp("([href|src][=])([\\\"|\\\'])(.*\\\." + pattern + ")(\\\d+)(" + types + ")([\\\"|\\\'])", "g");

            var pageData = grunt.file.read(f);

            var fileNames = [];
            var fileNamesNoVersion = [];
            var fileNamesVersion = [];

            var match = find.exec(pageData);
            while (match != null) {
                fileNames.push(match[3] + match[4] + match[5]);
                fileNamesNoVersion.push(self.data.base_dir + match[3].replace("." + pattern, '') + match[5]);
                fileNamesVersion.push(match[3] + version + match[5]);
                match = find.exec(pageData);
            }

            // adds version
            fileNames.forEach(function (fn, i) {
                pageData = pageData.replace(fn, fileNamesVersion[i]);
            });

            if (grunt.file.write(f, pageData)) {
                grunt.log.success('versions updated, now copying files :)');
            } else {
                grunt.log.error('versions updated failed...');
            }

            var filesToCopy = {};

            fileNamesNoVersion.forEach(function (f, i) {
                filesToCopy['c' + String(i)] = {
                    files: [{
                        cwd: '',
                        src: [f],
                        dest: self.data.base_dir + 'dist/' + fileNamesVersion[i],
                    }]
                };
            });

            grunt.config('copy', filesToCopy);
            grunt.task.run('copy');

        });

    });

};
