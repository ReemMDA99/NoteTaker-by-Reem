//Now sort api route functions from server.js to apiRoutes to modularize the code
//Add necessary dependencies to the file
const fs = require('fs');

//extract database folder 

const router = require('express').Router();

const db = require('../db/db.json');
//To install unique ID use npm package 'uniqID' and install using 'npm i uniq-id' command in terminal
const uniqID = require('uniq-id');

// create REST APIs (https://www.restapitutorial.com/lessons/httpmethods.html)
//Create GET request and response for function
//GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get('/api/notes', (req, res) => {
    fs.readFile('../db/db.json', (err, data) => {
        if (err) throw err;
    
        console.log(JSON.parse(data));

        res.json(JSON.parse(data));
    })
})
//POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
//Create POST request and response for functions
router.post('/api/notes', (req, res) => {
        let addNotes = {
            id: uniqID(),
            title: req.body.title,
            text: req.body.text
        }
fs.readFile('../db/db.json',  (err, data) => {
        if (err) throw err;
        let addData = JSON.parse(data);
        
        addData.push(addNotes);
    
       // console.log(JSON.parse(data));
        console.log(addData)

    //Now create filesystem module to write file and stringify in JSON
fs.writeFile('../db/db.json', JSON.stringify(addData), (err) => {
            if (err) throw err;
        
        res.send("Successfully added new note!");
        })
    });
})
module.exports = router;