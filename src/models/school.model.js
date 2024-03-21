/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const schoolSchema = mongoose.Schema({
  mid: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    index: 'text',
  },
  code: {
    type: String,
    required: true,
  },
  contact_number: {
    type: String,
  },
  address: {
    type: String,
  },
  date: {
    type: String,
  },
  month: {
    type: Number,
  },
  year: {
    type: Number,
  },
  logo: {
    type: Number,
  },
  udisecode: {
    type: String,
    unique: true,
  },
  district: {
    type: String,
  },
  block: {
    type: String,
  },
  s_type: {
    type: String,
  },
  management: {
    type: String,
  },
  category: {
    type: String,
  },
  status: {
    type: String,
  },
  preprimaryavl: {
    type: String,
  },
  initialization_year: {
    type: String,
  },
  lang: {
    type: Number,
  },
  lat: {
    type: Number,
  },
  student: {
    type: Number,
  },
  staff: {
    type: Number,
  },
  resultlist: [{
    _id: false, 
    male: String,
    female: String,
    class: String,
    section: String,
    class_id: String,
    section_id: String,
  }],
  total_student: {
    type: Number,
  },
  total_teacher: {
    type: Number,
  },
  scode: {
    type: String,
  }
});

// Add plugins
schoolSchema.plugin(toJSON);
schoolSchema.plugin(paginate);

const School = mongoose.model('School', schoolSchema);

module.exports = School;
