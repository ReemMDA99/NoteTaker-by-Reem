//(Create this file as similar to zookeeper modules)
//First create all the required functions in server.js and then sort them to route folder(similar to zookeeper module)

//Add necessary dependencies to the file
const express = require('express');
const app = express();
const path = require('path');

// Add express configurations to create express server
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//Create PORT and then add it to the listener in the end of this file
// use 3002 instead of 3001 as 3001 is already in use
const PORT = process.env.PORT || 3002;

//Add express app.use expressions to parse URL encoded
app.use(express.urlencoded({ extended:true }));

//Add express app.use expressions to parse JSON 
app.use(express.json());

// Host public folder to serve static assets
app.use(express.static(path.join(__dirname, 'public')));

//Use api routers to point our server to all route files
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


// //Add delete parameters using delete by notes id
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
//     });


//Add Listen port in the end to initiate server
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
  
//End of server.js