const mongoose = require('mongoose');

//--------Creating the schema to store the users----------X
const UsersSchema = new mongoose.Schema({
    username: { type: String, required: true, minlength: [5, 'Name must be 5 char long'], maxlength: [15, 'Name must not be 15 char long'], unique: true },

    email: { type: String, required: true, minlength: [7, 'Email must be 7 char long'], maxlength: [22, 'Email must not be 22 char long'], unique: true },

    // password : { type:String,minlength:[8,'Password must be 8 char long'],maxlength:[20,'Password must not be 20 char long']},
    password: { type: String, minlength: [8, 'Password must be 8 char long'] },

    profession: { type: String, minlength: [5, 'Profession must be 5 char long'], maxlength: [15, 'Profession must not be 15 char long'], default: 'User' },

    status: { type: Boolean, default: false },

    tag : {type:String, default:'user'}
}, { timestamps: true })

const UsersModal = mongoose.model('User', UsersSchema);

module.exports = UsersModal;