const mongoose = require('mongoose');

//--------Creating the schema to store the Courses----------X
const CoursesSchema = new mongoose.Schema({
    mentorID : { type:mongoose.Schema.Types.ObjectId, ref: "User"},

    title: { type: String, required: true, minlength: [9, 'Title must be 9 char long'], maxlength: [30, 'Title must not be 30 char long'], unique: true },

    description: { type: String, required: true, minlength: [15, 'Description must be 15 char long'], maxlength: [150, 'Description must not be 150 char long']},

    developers: { type: String, minlength: [15, 'Developers must be 15 char long'], maxlength: [150, 'Developers must not be 150 char long'],default:'Mentor'},

    img: { type: mongoose.Schema.Types.ObjectId, ref:"File"},

    launchDate: { type: Date, default: Date.now },

    expDate: { type: Date, default: 'Not Defined' },

    // status: { type: Boolean, default: false },

    // tag : {type:String, default:'user'}
}, { timestamps: true })

const CoursesModal = mongoose.model('Course', CoursesSchema);

module.exports = CoursesModal;