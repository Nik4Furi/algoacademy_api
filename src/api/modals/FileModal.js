const mongoose = require('mongoose');

//Create the schema to save the Files
const FileSchema = mongoose.Schema({
    Filename : { type : String, require : true },

    path : {type : String, require : true  },

    size : {type : Number, require : true },

    uuid : {type : String, require : true }
    
},{timestamps:true})

//File collection 
const FileModal = new mongoose.model('File',FileSchema);

module.exports = FileModal