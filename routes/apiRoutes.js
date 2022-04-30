//Now sort api route functions from server.js to apiRoutes to modularize the code
//Add necessary dependencies to the file
const fs = require('fs');
const router = require('express').Router();

//extract database folder 
const data = require('../db/db.json');

//To install unique ID use npm package 'uniqID' and install using 'npm i uniq-id' command in terminal
const uniqID = require('uniq-id');

// create REST APIs (https://www.restapitutorial.com/lessons/httpmethods.html)
//Create GET request and response for function
//GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get('/api/notes', (req, res) =>  {
        fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
          console.log(JSON.parse(data));
            res.json(data);
    })
 });

//POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
//Create POST request and response for functions
    router.post('/api/notes', (req, res) => {
    const addTitle = req.body.title;
    const addText = req.body.text;

        const addJson = {
            id: uniqID(),
            title: addTitle,
            text: addText
        }

    fs.readFile('./db/db.json', (err, data) => {
        if(err) throw err;
        
        let addData = JSON.parse(data);
        console.log(addData);
        console.log(addJson);

        addData.push(addJson);

  // Now create filesystem module to write file and stringify in JSON
    fs.writeFile('./db/db.json', JSON.stringify(addData), (err) => {
            if (err) throw err; 
            console.log("New note successfully added!");

        });
        res.json(data);
    });

});

//Add delete parameters using delete by notes id
// //DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
// app.delete('/api/notes/:id', function (req, res) {
//     fs.readFile('./db/db/json', 'utf8', (err, data) => {
//         if (err) throw err;

//         let thisNotes = JSON.parse(data);
//         let thisNotesId = req.params.id;
//         let newNoteId = 0;
        
//     thisNotes = thisNotes.filter(presentNotes => {
//         return presentNotes.id != thisNotesId;
//     });

//     for (presentNotes of thisNotes) {
//         presentNotes.id = newNoteId.toString();
//     }

//     fs.writeFileSync('./db/db.json', JSON.stringify(thisNotes),(err, data) => {
//         if (err) throw err;
//         console.log("Done!")
//     });
//     res.send(thisNotes);
//         });
    


module.exports = router;