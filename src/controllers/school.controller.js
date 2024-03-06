const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { schoolService } = require('../services');

const createSchool = catchAsync(async (req, res) => {
  const school = await schoolService.createSchool(req.body);
  res.status(httpStatus.CREATED).send(school);
});

const getSchools = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'udisecode']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await schoolService.querySchool(filter, options);
  res.send(result);
});

const getSchool = catchAsync(async (req, res) => {
  const school = await schoolService.getSchoolByUdisecode(req.params.udisecode);
  if (!school) {
    throw new ApiError(httpStatus.NOT_FOUND, 'school not found');
  }
  res.send(school);
});

module.exports = {
  createSchool,
  getSchools,
  getSchool,
};
