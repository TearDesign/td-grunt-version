# Grunt Static Files Versioning

Create versioned files for your web projects. This plugin simply looks up for any files with specific extension and pattern in your source template components and generates versioned files for you to publish.

## Install

```
npm install --save-dev td-grunt-version
```

## Configure

Load the npm task in your `Gruntfile.js`

```javascript
grunt.loadNpmTasks('td-grunt-version');
```

Configure the task

```javascript
grunt.initConfig({
  ...
  assets_versioning: {
      prod: {
        file_types: ['css', 'js'],
        pattern: 'versioning_',
        base_dir: 'test/',
        search_in: [
          'test/index.html'
        ]
      }
    }
  ...
});
```

```javascript
grunt.registerTask('build', ['assets_versioning:prod']);
```

Setup your template files to include the versioning pattern

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="css/style.versioning_0.css">
</head>
<body>
    <script src="js/script.versioning_0.js"></script>
</body>
</html>
```

### Configuration options

`file_types`
List of file types you wish to version

`pattern`
A pattern you will use in your template files and that will be used to identify files you wish to version

`base_dir`
The directory in which your source files are *and* a `dist` folder will be created with the versioned files

`replace_in`
Couples of files in the format { 'dest': 'template' } that you wish to replace versioning strings in.

## License

This plugin is distributed under the MIT license.

