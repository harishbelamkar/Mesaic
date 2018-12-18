# Mesaic
Mesaic Test : Create Student Database Application

# What's needed

* [Node.js](http://nodejs.org)
* [React](https://github.com/facebook/react) & [React Native](https://github.com/facebook/react-native)

## What's included

* [PropTypes](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)
* [Redux](https://github.com/reactjs/redux)
* [React native router flux](https://github.com/aksonov/react-native-router-flux)
* [React native SVG](https://github.com/react-native-community/react-native-svg)


## Start

* Install node, watchman, and react-native-cli by following this [guide](https://facebook.github.io/react-native/docs/getting-started.html)

## Develop
##### iOS

Run command to open iOS simulator and run app:
```
$ react-native run-ios
```
Or open `ios/RNBoilerplate.xcodeproj` file with XCode and run:


##### Android (5.0+)
Run command to open Android emulator and run app:

$ react-native run-android

Or open `android folder` file with android studio and run:

# If any issue or error occur in simulator or emulator 

run below command in your project root directory.

$ watchman watch-del-all && rm -rf $TMPDIR/react-* && rm -rf node_modules/ && npm cache verify && npm install && npm start -- --reset-cache




