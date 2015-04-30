Github Repos
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Queries [Github](https://developer.github.com/v3/) for all top-level repository data to which a user has access.


## Installation

``` bash
$ npm install @kgryte/github-repos
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var getRepos = require( '@kgryte/github-repos' );
```

#### getRepos( token[, opts])

Creates a new [`Query`](https://github.com/kgryte/github-get) instance for querying [Github](https://developer.github.com/v3/) for all top-level repository data to which a user has access.

``` javascript
var token = 'tkjorjk34ek3nj4!';

var query = getRepos( token );
query.on( 'data', onData );

function onData( evt ) {
	console.log( evt.data );
	// returns [{...},{...},...]
}
```

The `function` accepts the following `options`:

-	__interval__: positive `number` defining a poll [interval](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) for repeatedly querying the Github API. The interval should be in units of `milliseconds`. If an `interval` is __not__ provided, only a single query is made to the Github API.

	``` javascript
	var query, token, opts;

	token = 'tkjorjk34ek3nj4!';
	opts = {
		'interval': 600000 // 10 minutes
	};

	// Every 10 minutes, fetch the list of repos...
	query = getRepos( token, opts );
	query.on( 'data', onData );

	function onData( evt ) {
		console.log( evt.data );
		// returns [{...},{...},...]
	}
	``` 


## Notes

- 	This `function` is a light wrapper around [github-get](https://github.com/kgryte/github-get). The returned `Query` instance has the exact same API, meaning that all `Query` attributes, methods, and events are available. See [github-get](https://github.com/kgryte/github-get) for full documentation.




## Examples

``` javascript
var getRepos = require( '@kgryte/github-repos' );

var token,
	opts;

token = 'tkjorjk34ek3nj4!';
opts = {
	'interval': 10000 // ms
};

function onError( evt ) {
	console.error( evt );
}

function onRequest( evt ) {
	console.log( evt );
}

function onPage( evt ) {
	var pct = evt.count / evt.total * 100;
	console.log( 'Query %d progress: %d%.' , evt.qid, Math.round( pct ) );
}

function onData( evt ) {
	console.log( evt.data );
}

function onEnd( evt ) {
	console.log( 'Query %d ended...', evt.qid );
	console.dir( evt.ratelimit );
}

var query = getRepos( token, opts );
query.on( 'error', onError );
query.on( 'request', onRequest );
query.on( 'page', onPage );
query.on( 'data', onData );
query.on( 'end', onEnd );

// Stop polling after 60 seconds...
setTimeout( function stop() {
	query.stop();
}, 60000 );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

__Note__: in order to run the example, you will need to obtain a personal access [token](https://github.com/settings/tokens/new) and modify the `token` value accordingly.




---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g @kgryte/github-repos
```


### Usage

``` bash
Usage: github-repos [options]

Options:

  -h,    --help                Print this message.
  -V,    --version             Print the package version.
         --token [token]       Github personal access token.
         --interval [ms]       Poll interval (in milliseconds).
```

### Notes

*	In addition to the command-line `token` option, the token may also be specified by a `GITHUB_TOKEN` environment variable. The command-line option __always__ takes precedence.
*	If the process receives a terminating [signal event](https://nodejs.org/api/process.html#process_signal_events) (e.g., `CTRL+C`) while polling a Github API endpoint, the process will stop polling and wait for any pending requests to complete before exiting.


### Examples

Setting the personal access [token](https://github.com/settings/tokens/new) using the command-line option:

``` bash
$ github-repos --token <token>
# => '[{..},{..},...]'
```

Setting the personal access [token](https://github.com/settings/tokens/new) using an environment variable:

``` bash
$ GITHUB_TOKEN=<token> github-repos --interval 60000
# => '[{...},{...},...]'
```

For local installations, modify the command to point to the local installation directory; e.g., 

``` bash
$ ./node_modules/.bin/github-repos --token <token>
```

Or, if you have cloned this repository and run `npm install`, modify the command to point to the executable; e.g., 

``` bash
$ node ./bin/cli --token <token>
```


---
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
