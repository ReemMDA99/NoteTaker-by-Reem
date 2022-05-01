//Now sort api route functions from server.js to apiRoutes to modularize the code
//Add necessary dependencies to the file
const router = require('express').Router();
const fs = require('fs');
const express = require('express');

//extract database folder 
const data = require('../db/db.json');

//To install unique ID use npm package 'uniqID' and install using 'npm i uniq-id' command in terminal
const uniqID = require('uniq-id');

// create REST APIs (https://www.restapitutorial.com/lessons/httpmethods.html)
//Create GET request and response for function
//GET /api/notes should read the db.json file and return all saved notes as JSON.
    router.get('/', (req, res) =>  

            res.json(data));

//POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
//Create POST request and response json
        router.post('/', (req, res) => {

            const addData = {
                id: uniqID(),
                title: req.body.title,
                text: req.body.text
            };  
            data.push(addData);
            res.json(data);
        });
// create readFile file system module to read and parse in JSON
module.exports= function (app)  {
        fs.readFile('./db/db.json', (err, data) => {
            if(err) throw err;

            const addNote = JSON.parse(data);

        console.log(addNote);
        console.log(addJson);
    })
// Now create filesystem module to write file and stringify in JSON
  fs.writeFile('./db/db.json', JSON.stringify(addNote), (err) => { 
        if (err) throw err; 
            console.log("New note successfully added!");
    });
//Add delete parameters using delete by notes id
//DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete.

    app.delete('/api/notes/:id', function (req, res) {
            fs.readFile('./db/db/json', (err, data) => {
                if (err) throw err;

                const thisNotes = JSON.parse(data);
                const thisNotesId = req.params.id;
                const newNoteId = 0;

                thisNotes = thisNotes.filter(presentNotes => {
                    return presentNotes.id != thisNotesId;
                }); 
                for (presentNotes of thisNotes) {
                    presentNotes.id = newNoteId.toString();
                    newNotesId++;
                }
                fs.writeFileSync('./db/db.json', JSON.stringify(thisNotes),(err, data) => {
                    if (err) throw err;
                    console.log("Deleted!")
                });
            res.send(thisNotes);
        });
    });
}

module.exports = router;