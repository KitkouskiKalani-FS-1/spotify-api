const express = require('express');
const router = express.Router();

//Read all
router.get('/', (req,res) =>{
    res.json({"header": "Spotify Homepage"})
})

//Read one
router.get('/:id', (req,res)=>{
    res.send(`Spotify read one ID:${req.params.id}`)
})


module.exports = router;