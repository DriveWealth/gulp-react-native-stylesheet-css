# gulp-react-native-stylesheet-css

Gulp plugin for converting CSS files to React Native StyleSheets.


## Install

```
npm install gulp-react-native-stylesheet-css --save-dev
```

You can use it with [react-native-extended-stylesheet](https://github.com/vitalets/react-native-extended-stylesheet)

## Basic usage

```javascript
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    reactNativeStylesheetCss = require('gulp-react-native-stylesheet-css');

gulp.task('styles', function() {
    gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(reactNativeStylesheetCss())
        .pipe(gulp.dest('./dist/sass/'));
});
```

SASS or any other CSS preprocessor is not required. Plain .CSS files may be used.

## Example output

Example using SASS as a preprocessor:

__Input__

```scss
#header {
    margin-bottom: 20;
    box-shadow: 0 2px 4px rgba(52, 21, 23, 0.32);

    .btn {
        padding: 3 8;
        text-align: center;
        transform: scale(0.8) translateY(4px) rotate3d(20deg, 5deg, 10deg);
    }
}
```

__Output__

```javascript
var React = require('react-native');
var { StyleSheet } = React;
module.exports = StyleSheet.create({
    "header": {
        "marginBottom": 20,
        "shadowColor": "rgb(52,21,23)",
        "shadowOffset": {
            "width": 0,
            "height": 2
        },
        "shadowOpacity": 0.32,
        "shadowRadius": 4
    },
    "header btn": {
        "paddingTop": 3,
        "paddingBottom": 3,
        "paddingRight": 8,
        "paddingLeft": 8,
        "textAlign": "center"
        "transform": [
            { "scale": 0.8 },
            { "translateY": 4 },
            { "rotateX": "20deg" },
            { "rotateY": "5deg" },
            { "rotateZ": "10deg" }
        ]
    }
});
```

## Properties supported

Any property found in your CSS will be camelCased. By default, this plugin will always output values as JavaScript Number or Boolean objects when appropriate. Values with units attached, including "em" and "px," will be output without their unit suffixes.

### Special-case properties

The following properties output different keys to satisfy React Native's requirements. Unless otherwise noted, the values for each correspond with CSS3.

Property | Example Values | Notes
---------|----------------|------
margin | 2px<br />2px 4px<br />3px 1px 5px<br />1px 3px 2px 6px |
padding | 2px<br />2px 4px<br />3px 1px 5px<br />1px 3px 2px 6px |
box-shadow | none<br />0 2px 4px rgba(52, 21, 23, 0.32) | Inset shadows and spread values are not supported.
flex | 1<br />1 30px<br />1 2 10% | __Only the first value will be output__ and the rest will be ignored, as React Native does not support flex-basis or flex-shrink.
transform | perspective(90)<br />rotate(10deg)<br />rotateX(5deg)<br />rotateY(10deg)<br />rotateZ(15deg)<br />rotate3d(5deg, 10deg, 15deg)<br />scale(1.2)<br />scaleX(1.5)<br />scaleY(0.5)<br />scale2d(1.5, 0.5) or scale3d(1.5, 0.5)<br />translateX(5px)<br />translateY(10px)<br />translate2d(5px, 10px) or translate3d(5px, 10px) | You may chain multiple transformations together with a space delimiter, like in CSS3 (see example above).

## Options

Additional options can be passed to the plugin to customize its output. For example:

```javascript
    ...
    .pipe(reactNativeStylesheetCss({ outputPlainObject: true }))
    .pipe(reactNativeStylesheetCss({ withExtendedStyleSheet: true }))
    ...
```

__Supported options:__

Option | Values | Default | Notes
-------|--------|---------|------
outputPlainObject | Boolean | false | If true, the final output will be only an object of style rules, without requiring React or building a React StyleSheet object.
withExtendedStyleSheet | Boolean | false | Support for [react-native-extended-stylesheet](https://github.com/vitalets/react-native-extended-stylesheet)
module | String | es6 | default support es6, if `commonjs`, it will create js for commonjs mudule.

## About

Licensed under MIT. Based off of the works of [gulp-react-native-css](https://github.com/soliury/gulp-react-native-css) and [react-native-css](https://github.com/sabeurthabti/react-native-css).
