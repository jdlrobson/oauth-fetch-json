var fetch = require( 'node-fetch' );
var param = require( 'node-jquery-param' );
var OAuth = require( 'oauth' );

function signedRequest( url, session, params, options ) {
  var oauth = new OAuth.OAuth(
    // URL to request a token
    'https://meta.wikimedia.org/index.php?title=Special%3AOAuth%2Finitiate',
    // URL to get access token
    'https://meta.wikimedia.org/index.php??title=Special%3AOAuth%2Ftoken',
    session.oauth.consumer_key,
    session.oauth.consumer_secret,
    '1.0',
    null,
    'HMAC-SHA1'
  );

  return new Promise( function ( resolve, reject ) {
    var handler = function ( err, data ) {
      if ( err ) {
        reject( JSON.stringify( err ) );
      } else {
        resolve( JSON.parse( data ) );
      }
    };

    if ( options && options.method === 'POST' ) {
      oauth.post(
        url,
        session.oauth.token,
        session.oauth.token_secret,
        params,
        handler );
    } else {
      url += '?' + param( params );
      oauth.get(
        url,
        session.oauth.token,
        session.oauth.token_secret,
        handler);
    }
  } );
}

function anonRequest( url, params, options ) {
  if ( options && options.method === 'POST' ) {
    options.body = JSON.stringify( params );
  } else {
    url += '?' + param( Object.assign( {}, params ) );
  }
  return fetch( url, options )
    .then( function ( resp ) {
     if ( resp.status === 200 ) {
       return resp.json();
     } else {
       throw Error( resp.status );
     }
    } ).then( function ( json ) {
      return json;
    });
}

module.exports = function ( url, params, options, session ) {
  if ( session ) {
    return signedRequest( url, session, params, options );
  } else {
    return anonRequest( url, params, options );
  }
};
