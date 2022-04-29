//(Create this file as similar to zookeeper modules)
//First create all the required functions in server.js and then sort them to route folder(similar to zookeeper module)

//Add necessary dependencies to the file
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

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
app.use(express.static('public'));

//extract database folder 
const database = require('../projects/NoteTaker-by-Reem/db/db.json')
const router = require('express').Router();
const id = require('id');

// create REST APIs (https://www.restapitutorial.com/lessons/httpmethods.html)
//Create GET request and response for function

router.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err,data) => {
        if (err) throw err;
    
        console.log(JSON.parse(data));

        res.sendFile(data)
    })
})

//Create POST request and response for functions
router.post('/api/notes', (req, res) => {
        let addNotes = {
            id: id(),
            title: req.body.title,
            text: req.body.text
        }
    fs.readFile('./db/db.json', 'utf8', (err,data) => {
        if (err) throw err;
        let addData = JSON.parse(data);
        addData.push(addNotes);
    
       // console.log(JSON.parse(data));
        console.log(addData)

    //Now create filesystem module to write file and stringify in JSON
        fs.writeFile('./db/db.json', JSON.stringify(addData), (err) => {
            if (err) throw err;
        
        res.sendFile("Successfully added new note!");
        })
    });
})
//Use api routers to point our server to all route files
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//Add Listen port in the end to initiate server
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
  
//End of server.js