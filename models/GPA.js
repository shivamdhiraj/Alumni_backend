const mongoose = require('mongoose');

const GPASchema = new mongoose.Schema({
  rollNumber: {
    type: String,
    ref: 'User',
    required: true
  },
  semesters: [{
    semester: {
      type: String,
      required: true
    },
    gpa: {
      type: Number,
      required: true
    },
    backlogs: [String]
  }]
});

const GPA = mongoose.model('GPA', GPASchema);

module.exports = GPA;
