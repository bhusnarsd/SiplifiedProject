/* eslint-disable prettier/prettier */
const Joi = require('joi');

const getSchools = {
  query: Joi.object().keys({
    name: Joi.string(),
    udisecode: Joi.string(),
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

module.exports = {
//   createUser,
  getSchools,
  getSchool,
};
