/* eslint-disable prettier/prettier */
const Joi = require('joi');

const getSchools = {
  query: Joi.object().keys({
    name: Joi.string(),
    district: Joi.string(),
    block: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
const getSchoolsDistrict = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSchool = {
  params: Joi.object().keys({
    udisecode: Joi.string(),
  }),
};

const getBlock = {
  body: Joi.object().keys({
    district: Joi.string(),
  }),
};

const getSchoolByFilter = {
  query: Joi.object().keys({
    district: Joi.string(),
    block: Joi.string(),
  }),
};


module.exports = {
//   createUser,
  getSchools,
  getSchool,
  getSchoolByFilter,
  getBlock,
  getSchoolsDistrict,
};
