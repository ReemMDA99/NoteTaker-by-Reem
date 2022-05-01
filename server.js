//(Create this file as similar to zookeeper modules)
//First create all the required functions in server.js and then sort them to route folder(similar to zookeeper module)

//Add necessary dependencies to the file
const express = require('express');
const path = require('path');

//Create PORT and then add it to the listener in the end of this file
// use 3002 instead of 3001 as 3001 is already in use
const PORT = process.env.PORT || 3002;

// Add express configurations to create express server
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


//load express.js
const app = express();

//Add express app.use expressions to parse URL encoded
app.use(express.urlencoded({ extended:true }));

//Add middleware expressions to parse JSON 
app.use(express.json());

// Host public folder to serve static assets
app.use(express.static(path.join(__dirname, 'public')));

//Use api routers to point our server to all route files
app.use('/api/notes', apiRoutes);
app.use('/', htmlRoutes);

//Add Listen port in the end to initiate server
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
  
//End of server.
