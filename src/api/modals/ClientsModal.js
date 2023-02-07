const mongoose = require('mongoose');

//--------Creating the schema to store the Clients----------X
const ClientsSchema = new mongoose.Schema({
    fullname: { type: String, required: true, minlength: [5, 'fullname must be 5 char long'], maxlength: [15, 'fullname must not be 15 char long'] },

    email: { type: String, required: true, minlength: [7, 'Email must be 7 char long'], maxlength: [22, 'Email must not be 22 char long'] },

    phone: { type: Number, minlength: [10, 'Phone must be 10 char long'], maxlength: [12, 'Phone must not be 12 char long'], default: false },

    profession: { type: String, required: true, minlength: [5, 'Profession must be 5 char long'], maxlength: [15, 'Profession must not be 15 char long'] },

    concern: { type: String, required: true, minlength: [9, 'Concern must be 9 char long']}
}, { timestamps: true })

const ClientsModal = mongoose.model('Client', ClientsSchema);

module.exports = ClientsModal;