const express = require('express');
const router = express.Router();

//Read all
router.get('/', (req,res) =>{
    res.send('Spotify Read All')
})

//Read one
router.get('/:id', (req,res)=>{
    res.send(`Spotify read one ID:${req.params.id}`)
})


module.exports = router;