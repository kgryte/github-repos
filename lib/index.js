'use strict';

// MODULES //

var merge = require( 'utils-merge2' )(),
	isObject = require( 'validate.io-object' ),
	isString = require( 'validate.io-string-primitive' ),
	isPositive = require( 'validate.io-positive' ),
	createQuery = require( '@kgryte/github-get' );


// VARIABLES //

var OPTS = require( './opts.json' );


// GET REPOS //

/**
* FUNCTION: getRepos( token[, opts] )
*	Returns a new query instance.
*
* @param {String} token - Github access token
* @param {Object} [opts] - function options
* @param {Number} [opts.interval] - defines a poll interval (in milliseconds) for repeatedly querying an endpoint
* @returns {Query} Query instance
*/
function getRepos( token, options ) {
	var opts = {};
	if ( !isString( token ) ) {
		throw new TypeError( 'getRepos()::invalid input argument. Github personal access token must be a string primitive. Value: `' + token + '`.' );
	}
	if ( arguments.length > 1 ) {
		if ( !isObject( options ) ) {
			throw new TypeError( 'getRepos()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
		}
		if ( options.hasOwnProperty( 'interval' ) ) {
			opts.interval = options.interval;
			if ( !isPositive( opts.interval ) ) {
				throw new TypeError( 'getRepos()::invalid option. Interval option must be a positive number. Option: `' + opts.interval + '`.' );
			}
		}
	}
	opts = merge( {}, OPTS, opts );

	// Set the user's personal access token which is used for authentication and authorization:
	opts.headers.Authorization = 'token ' + token;

	// Return a new query instance:
	return createQuery( opts );
} // end FUNCTION getRepos()


// EXPORTS //

module.exports = getRepos;
