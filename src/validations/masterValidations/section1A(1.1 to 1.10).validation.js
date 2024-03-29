const Joi = require('joi');
const { objectId } = require('../custom.validation');

const createSection1A10 = {
  body: Joi.object().keys({
    UDISEcode: Joi.string().required(),
    schoolname: Joi.string(),
    districtname: Joi.string(),
    udiseblock: Joi.string(),
    typeofschool: Joi.string(),
    revenueblock: Joi.string().allow('').optional(),
    villagename: Joi.string().allow('').optional(),
    grampanchayatname: Joi.string().allow('').optional(),
    urbanlocalbodies: Joi.string().allow('').optional(),
    wardname: Joi.string().allow('').optional(),
    Address: Joi.string().allow('').optional(), // changes
    pincode: Joi.string().allow('').optional(),
    crc: Joi.string().allow('').optional(),
    assembly: Joi.string().allow('').optional(),
    parliamentary: Joi.string().allow('').optional(),
    latitude: Joi.string().allow('').optional(),
    longitude: Joi.string().allow('').optional(),
    stdcode: Joi.string().allow('').optional(),
    landline: Joi.string().allow('').optional(),
    mobileno: Joi.string().allow('').optional(),
    email: Joi.string().allow('').optional(),
    website: Joi.string().allow('').optional(),
    profile_count: Joi.string().allow('').optional(),
    scode: Joi.string().allow('').optional(),
  }),
};

const getAllSection1A10 = {
  query: Joi.object().keys({
    udise_code: Joi.string().allow('').optional(),
    sortBy: Joi.string().allow('').optional(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSchoolByScode = {
  params: Joi.object().keys({
    scode: Joi.string(),
  }),
};

const getSection1A10 = {
  params: Joi.object().keys({
    Section1A10Id: Joi.string().custom(objectId),
  }),
};

const updateSection1A10 = {
  params: Joi.object().keys({
    Section1A10Id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      UDISEcode: Joi.string(),
      schoolname: Joi.string(),
      districtname: Joi.string(),
      udiseblock: Joi.string(),
      typeofschool: Joi.string(),
      revenueblock: Joi.string().allow('').optional(),
      villagename: Joi.string().allow('').optional(),
      grampanchayatname: Joi.string().allow('').optional(),
      urbanlocalbodies: Joi.string().allow('').optional(),
      wardname: Joi.string().allow('').optional(),
      Address: Joi.string().allow('').optional(),
      pincode: Joi.string().allow('').optional(),
      crc: Joi.string().allow('').optional(),
      assembly: Joi.string().allow('').optional(),
      parliamentary: Joi.string().allow('').optional(),
      latitude: Joi.string().allow('').optional(),
      longitude: Joi.string().allow('').optional(),
      stdcode: Joi.string().allow('').optional(),
      landline: Joi.string().allow('').optional(),
      mobileno: Joi.string().allow('').optional(),
      email: Joi.string().allow('').optional(),
      website: Joi.string().allow('').optional(),
      profile_count: Joi.string().allow('').optional(),
      scode: Joi.string().allow('').optional(),
    })
    .min(1),
};

const deleteSection1A10 = {
  params: Joi.object().keys({
    Section1A10Id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createSection1A10,
  getAllSection1A10,
  getSection1A10,
  updateSection1A10,
  deleteSection1A10,
  getSchoolByScode,
};
