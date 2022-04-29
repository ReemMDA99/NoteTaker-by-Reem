const path = require('path');
const router = require('express').Router();


// Create REST api route functions for htmlRoutes.js 
    //GET notes from notes.html
    
    // app.get('/', (req, res) => {
    //     res.sendFile(path.join(__dirname, './public/index.html'));
    // });

    router.get('/notes', (req, res)=> {
        res.sendFile(path.join(__dirname, './public/notes.html'));
    
    });
    // GET * - Should return the index.html file
    router.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './public/index.html'));
    })

    
 
    module.exports = router;