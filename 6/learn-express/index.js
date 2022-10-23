const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send("hello express");
});
router.route('/abc')
    .get((req, res)=>{
        res.send('get /abc')
    })
    .post((req,res)=>{
        res.send('post /abc')
    });

    
module.exports = router;