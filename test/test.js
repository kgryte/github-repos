/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module for intercepting HTTP requests:
	nock = require( 'nock' ),

	// Module to be tested:
	getRepos = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( '@kgryte/github-repos', function tests() {

	function replace( path ) {
		return path.replace( /\?.*/, '' );
	}

	it( 'should export a function', function test() {
		expect( getRepos ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-string token', function test() {
		var values = [
			{},
			5,
			true,
			null,
			undefined,
			NaN,
			[],
			function(){}
		];
		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				getRepos( value );
			};
		}
	});

	it( 'should throw an error if provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			null,
			undefined,
			NaN,
			[],
			function(){}
		];
		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				getRepos( 'beep', value );
			};
		}
	});

	it( 'should throw an error if provided an interval option which is not a positive number', function test() {
		var values = [
			'5',
			-1,
			0,
			true,
			null,
			undefined,
			NaN,
			[],
			{},
			function(){}
		];
		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				getRepos( 'beep', {
					'interval': value
				});
			};
		}
	});

	it( 'should return a query instance', function test() {
		var query,
			scope;

		scope = nock( 'https://api.github.com' )
			.filteringPath( replace )
			.get( '/user/repos' )
			.reply( 200, '[{}]' );

		query = getRepos( 'token' );

		assert.isFunction( query.start );
		assert.isFunction( query.stop );
		assert.isFunction( query.query );
		assert.isNumber( query.interval );
		assert.isBoolean( query.all );
		assert.isNumber( query.pending );

		assert.isTrue( query.all );
	});

	it( 'should return a query instance having a specified interval', function test() {
		var query,
			scope;

		scope = nock( 'https://api.github.com' )
			.filteringPath( replace )
			.get( '/user/repos' )
			.reply( 200, '[{}]' );

		query = getRepos( 'token', {
			'interval': 10000
		});

		query.stop();

		assert.strictEqual( query.interval, 10000 );
	});

	it( 'should emit an array of repositories', function test( done ) {
		var query,
			scope;

		scope = nock( 'https://api.github.com' )
			.filteringPath( replace )
			.get( '/user/repos' )
			.reply( 200, '[{}]' );

		query = getRepos( 'token', {} );
		query.on( 'data', onData );

		function onData( evt ) {
			assert.isArray( evt.data );
			done();
		}
	});

});
