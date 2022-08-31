const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');
const querystring = require('querystring');
const randomstring = require('randomstring');
const URLSearchParams = require('urlsearchparams');
const { request } = require('http');
const SpotifyWebApi = require('spotify-web-api-node');
const SpotifyToken = require('../models/spotifytoken');
const now = new Date().getTime()


// API Login
router.get('/login', (req,res) =>{
    const state = randomstring.generate(16)
    const scope = 'user-read-private'

    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: scope,
      redirect_uri: 'http://localhost:3000',
      state: state
    }));
    
    
    // res.json("Logging in user")
})

const requestRefreshToken = async(refreshToken, token) =>{
    console.log(refreshToken)
    console.log(token)
    return axios({
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token', 
        refresh_token: refreshToken + 'refresh_token',
        headers: {
          'Authorization': 'Basic ' + (new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(({ data }) => {
        data.expires_in = new Date().getTime() + data.expires_in
        token.update( data )
        return token.save()
      }).catch((error) => { return false })
}

const checkValidToken = async(res, req, next) =>{
    console.log("calling middleware")
    const token = await SpotifyToken.findOne({}).sort({"expires_in": -1}).limit(1)
    if(!token){
        res.redirect('http://localhost:3000')
        return next();
    }
    else if(now>token.expires_in){
        requestRefreshToken(token.refresh_token, token)
        return next();
    }
    return next ();
}
 
//API Authenticate
router.post('/auth', function (req, res) {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri:'http://localhost:3000',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    })

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data=>{

            const token = new SpotifyToken({
            access_token:data.body.access_token,
            refresh_token:data.body.refresh_token,
            expires_in: new Date().getTime() + data.body.expires_in
            })
            try{
                const newToken = token.save();
                res.status(201).json(token)
            } catch(error) {
                res.status(400).json({ message: error.message })
            }
        })
        .catch(err =>{
            console.log(err)
            res.sendStatus(400)
        })   
  });   

router.post('/search', async (req,res)=>{
    // let spotifyArtists;
    // let spotifyAlbums;
    // let spotifyPlaylists;
    // const spotifyWebApi = new SpotifyWebApi({
    //     clientId: process.env.CLIENT_ID,
    // })
    // spotifyWebApi.setAccessToken({token}.token.access_token)
    // spotifyWebApi.searchArtists(req.body.searchInput).then(data=>{   
    //     spotifyArtists=data.body.artists;
    // })
    // spotifyWebApi.searchPlaylists(req.body.searchInput).then(data=>{   
    //     spotifyPlaylists=data.body.playlists
    // })
    // spotifyWebApi.searchAlbums(req.body.searchInput).then(data=>{   
    //     spotifyAlbums= data.body.albums
    // })
    // res.json({
    //     artists: spotifyArtists,
    //     playlists: spotifyPlaylists,
    //     albums: spotifyPlaylists
    // })

    // const token = await SpotifyToken.findOne({})

    await axios({
        method: 'GET',
        url: 'https://api.spotify.com/v1/search',
        params: {
          type: 'artist,playlist,album',
          q: req.body.searchInput,
          limit: 3
        },
        headers: { 
          'Authorization': 'Bearer ' + req.body.accessToken,
          'Content-Type': 'application/json'
        }
      }).then(({data}) => {
        res.json(data)
      }).catch((error) => {
        res.json(error)
      })
})

module.exports = router;