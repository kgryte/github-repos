@kgryte/github-repos
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Returns all Github repositories to which a user has access.


## Installation

``` bash
$ npm install @kgryte/github-repos
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var foo = require( '@kgryte/github-repos' );
```

#### foo()

What does this function do?


## Examples

``` javascript
var foo = require( '@kgryte/github-repos' );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/@kgryte/github-repos.svg
[npm-url]: https://npmjs.org/package/@kgryte/github-repos

[travis-image]: http://img.shields.io/travis/kgryte/github-repos/master.svg
[travis-url]: https://travis-ci.org/kgryte/github-repos

[coveralls-image]: https://img.shields.io/coveralls/kgryte/github-repos/master.svg
[coveralls-url]: https://coveralls.io/r/kgryte/github-repos?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/github-repos.svg
[dependencies-url]: https://david-dm.org/kgryte/github-repos

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/github-repos.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/github-repos

[github-issues-image]: http://img.shields.io/github/issues/kgryte/github-repos.svg
[github-issues-url]: https://github.com/kgryte/github-repos/issues
