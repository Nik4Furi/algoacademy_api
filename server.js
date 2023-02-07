//--------Initalizing the server and imports the packages form 'package.json'----------X
// console.log('Welcome in AlgoAcademy');
require('dotenv').config();
require('./db'); //Connect to database
const express = require('express');
const cors = require('cors')
const app = express();

//-------Imports the in built packages from 'npm' to use the urlencoded data--------X
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json())

//------------According to the version of the app, work like them------X
if (process.env.VERSION == 'v1') {
    //-----Imports or require the variables, or funtions from routers------X
    const Routers = require('./src/api/v1/routers');

    //--------Express Specific Stuff---------X
    app.use('/api',Routers);
}


//-----------Define or import the variables from '.env'-----X
const Url = process.env.URL || 'http://localhost';
const Port = process.env.PORT || 8001 ;

//---------Listen the server for Express App-----------X
app.listen(Port,()=> console.log(`Application listen at ${Url}:${Port}`))