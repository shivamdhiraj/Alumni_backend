const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc : {
    type : String,
    default : ""
  },
  date: {
    type: Date,
    required: true,
  },
}, {timestamps : true}
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;