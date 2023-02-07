const mongoose = require('mongoose');

// const Data_Uri = process.env.DATA_URI;
const Uri = process.env.URI;

//--------Connect to the database in the cloud---------X
mongoose.set('strictQuery', false);
mongoose.connect(Uri).
    then(() => console.info('Establish the connection to database')).
    catch((e) => console.log(`${e} occured during connection to database`))