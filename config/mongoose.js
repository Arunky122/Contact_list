// Require the library
const mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db');

//Acquire the connection(to check if it is succesful)
const db = mongoose.connection;

// Error
db.on('error', console.error.bind(console,'error connecting to db'));

// Up and running the print message
db.once('open',function(){
    console.log('**************Successfully connected to the database*****************');
});