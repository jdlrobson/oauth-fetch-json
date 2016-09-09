This module simplifies the logic for making oauth authenticated requests for JSON.
This is compatible with passport oauth strategies.
If no oauth session is available, a standard fetch will be used.

Usage

	var oauthFetch = require( 'oauth-fetch-json' );
	oauthFetch( url, { query: 'foo': data: {} }, {}, session ).then( function ( json ) {
		console.log( "I got a json!", json );
	} ).catch( function ( err ) {
		console.log( 'whoops', err );
	} );
