const express = require('express');
const cookieParser = require('cookie-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();

const authCode = "";
const scope = ["playlist-read-private", "playlist-modify-public", "playlist-read-collaborative"]
const clientId = "17daf0b35115494c8d903d543903affa"
const clientSecret = "8af6af3210564016aaaac289e97dbe80"
const redirectUri = "http://localhost:3000/callback"
const spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret,
  redirectUri : redirectUri
});

let auth_code;

app.use(cookieParser());

app.get("/", (req, res) => {
	const state = Math.round(Math.random() * 10000000000000).toString();
	const authorizeURL = spotifyApi.createAuthorizeURL(scope, state);
	
	// Hier checken of je al access token hebt, en view er op aanpassen
	res.send(`Hoi, je moet authenicaten <a href="${authorizeURL}">hier</a>`);
});

app.get("/callback", (req, res) => {
	spotifyApi.authorizationCodeGrant(req.query.code).then(data => {
	    console.log('The token expires in ' + data.body['expires_in']);
	    console.log('The access token is ' + data.body['access_token']);
	    console.log('The refresh token is ' + data.body['refresh_token']);

	    // Set the access token on the API object to use it in later calls
	    spotifyApi.setAccessToken(data.body['access_token']);
	    spotifyApi.setRefreshToken(data.body['refresh_token']);
	    res.send("Je bent ingelogd gast")
	  },
	  err => {
	    console.log('Something went wrong!', err);
	    res.send("Je bent niet ingelogd gast")
	  }
	);
	res.redirect("/")
});

app.listen(3000, () => console.log('App listening on port 3000!'));
