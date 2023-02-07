//---------import the dependies to uploads files
const multer = require('multer');
const path = require('path');

// console.log(path.join(__dirname,'../../../../uploads'));
// console.log(path.join(__dirname,'uploads'));

//Define the storage where to save our files
const Storage = multer.diskStorage({
    // destination : `${path.join(__dirname,'../../../../uploads')}`,
    destination : `${path.join(__dirname,'uploads')}`,
    filename : (req,file,cb)=>{
        const uniqueName = `${Date.now()}-${Math.floor(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null,uniqueName);
    }
})

//--------Writing the file filter its checking uploading file is only .png, .jpg, .jpeg---------X
const fileFilter = (req,file,cb)=>{
    // console.log(file,file.mimetype)
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'))
    }
    cb(null,true)
}

//Define the uploads with some limitations
const Upload = multer({
    storage : Storage,
    fileFilter,
    limits : {fileSize : 1000 * 1000 * 10}
})

module.exports = Upload; 