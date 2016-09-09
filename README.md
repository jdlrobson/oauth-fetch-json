This module simplifies the logic for making oauth authenticated requests for JSON.
This is compatible with passport oauth strategies.
If no oauth session is available, a standard fetch will be used.

Usage

	import passport from 'passport'
	import oauthFetch from 'oauth-fetch-json'
	
	passport.use(
		new OAuthStrategy({
			consumerKey: CONSUMER_KEY,
			consumerSecret: CONSUMER_SECRET
		},
		function(token, tokenSecret, profile, done) {
			profile.oauth = {
				consumer_key : CONSUMER_KEY,
				consumer_secret : CONSUMER_SECRET,
				token : token,
				token_secret : tokenSecret
			}
			return done(null, profile);
		} )
	);
	
	const app = express()
	function ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.status( 401 );
			res.send( 'Login required for this endpoint' );
		}
	}
	app.get('/oauth/endpoint', ensureAuthenticated, function(req, res){
			oauthFetch( 'http://endpointWhichYouAreOAuthenticatedAgainst.org', { query: 'foo' }, {}, req.user.oauth ).then( function ( data ) {
				res.setHeader('Content-Type', 'application/json');
				res.status( 200 );
				res.send( JSON.stringify( data ) );
			} );
		};
	});

