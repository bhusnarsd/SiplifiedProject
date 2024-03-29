/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const attendanceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: 'text',
  },
  scode: {
    type: String,
    required: true,
  },
  date: { 
    type: Date,
    required: true,
  },
  udisecode: {
    type: String,
  },
  division:{
    type: String,
  },
  district: {
    type: String,
  },
  block: {
    type: String,
  },
  resultlist: [{
    _id: false, 
    present: Number,
    absent: Number,
    class: String,
    section: String,
    class_id: String,
    section_id: String,
  }],
  totalPresent: {
    type: Number,
  },
  totalAbsent: {
    type: Number,
  },
});

// Add plugins
attendanceSchema.plugin(toJSON);
attendanceSchema.plugin(paginate);

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
