const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');
const querystring = require('querystring');
const randomstring = require('randomstring');
const URLSearchParams = require('urlsearchparams');
const { request } = require('http');
const SpotifyWebApi = require('spotify-web-api-node');
const SpotifyToken = require('../models/spotifytoken')


// const storeToken = async (req, res, next)=>{
//     const token = new SpotifyToken({
//     accessToken:req.access_token,
//     refreshToken:req.refresh_token,
//     expiresIn: req.expires_in
//     })
//     try{
//         const newToken = await token.save();
//         return res.status(201).json(newToken)
//     } catch(error) {
//         return res.status(400).json({ message: error.message })
//     }
//     return next()
// }
router.get('/token', (req,res)=>{

})

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

router.get('/checktoken', (req,res)=>{
    
})
    //Auth code not working

    
    
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
            expires_in: data.body.expires_in
            })
            try{
                const newToken = token.save();
                res.status(201).json(newToken)
            } catch(error) {
                res.status(400).json({ message: error.message })
            }
        })
        .catch(err =>{
            console.log(err)
            res.sendStatus(400)
        })  

    //Spotify API documentation

    // var code = req.query.code || null;
    // var state = req.query.state || null;
  
    // if (state === null) {
    //   res.redirect('/#' +
    //     querystring.stringify({
    //       error: 'state_mismatch'
    //     }));
    // } else {
    //   var authOptions = {
    //     url: 'https://accounts.spotify.com/api/token',
    //     form: {
    //       code: code,
    //       redirect_uri: "http://localhost:3001/spotify/v1/token",
    //       grant_type: 'authorization_code'
    //     },
    //     headers: {
    //       'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
    //     },
    //     json: true
    //   };
    //   axios.post(authOptions, (error, response, body)=>{
          
    //   })
    // }

    ///
    ///
    ///

    // Not fully working axios request in auth
    // var code = req.query.code || null;
    // var state = req.query.state || null;
    // axios({
    //     method: 'POST',
    //     url: 'https://accounts.spotify.com/api/token',
    //     form:{
    //         code: code,
    //         redirect_uri: "http://localhost:3001/spotify/v1/token",
    //         grant_type: 'authorization_code',
    //     },
    //     headers: {
    //         'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')),
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    //     }, (error, response, body)=>{
    //         console.log('passed auth')
    // })  
  });   

router.get('/token', (req,res)=>{
    res.send(req.query.authorization_code)
})

module.exports = router;