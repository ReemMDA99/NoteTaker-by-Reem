//Add necessary dependencies to the file
const express = require('express');
const app = express();

// Add express configurations to create express server
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//Create PORT
const PORT = process.env.PORT || 3002;

//Add express app.use expressions to parse URL encoded
app.use(express.urlencoded({ extended:true }));

//Add express app.use expressions to parse JSON 
app.use(express.json());

// Host public folder to serve static assets
app.use(express.static('public'));

//Create GET request and response for functions

//Create GET request and response for functions


//create router files

//Add require routers

//Add Listen port in the end to initiate server
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
  
