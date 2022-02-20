const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Contact = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  iban: {
    type: String
  },
  dob:  {
    type: String
  }
}, {
  collection: 'contacts'
})
module.exports = mongoose.model('Contact', Contact)