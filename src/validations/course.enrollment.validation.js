const Joi = require('joi');
const { objectId } = require('../validations/custom.validation');

const createEnrollment = {
  body: Joi.object().keys({
    courseName: Joi.string().required(),
    courseObjectId: Joi.string().required(),
    teacherName: Joi.string().required(),
    teacherId: Joi.string().required(),
    scode: Joi.string().required(),
    contactNo: Joi.number().required(),
  }),
};

const getAllEnrollments = {
  query: Joi.object().keys({
    courseName: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getEnrollment = {
  params: Joi.object().keys({
    enrollmentId: Joi.string().custom(objectId),
  }),
};

const updateEnrollmentById = {
  params: Joi.object().keys({
    enrollmentId: Joi.string(),
  }),
  body: Joi.object()
    .keys({
        courseName: Joi.string(),
        courseObjectId: Joi.string(),
        teacherName: Joi.string(),
        teacherId: Joi.string(),
        scode: Joi.string(),
        contactNo: Joi.number(),
    })
    .min(1),
};
const deleteEnrollmentById = {
  params: Joi.object().keys({
    enrollmentId: Joi.string(),
  }),
};

module.exports = {
  createEnrollment,
  getAllEnrollments,
  getEnrollment,
  updateEnrollmentById,
  deleteEnrollmentById,
};
