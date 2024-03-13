/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
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
  const filter = pick(req.query, ['name', 'district', 'block']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await schoolService.querySchool(filter, options);
  res.send(result);
});

const getSchoolsByDistrict = catchAsync(async (req, res) => {
  const  district  = req.user.asssignedTo;
  const filter = { district };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await schoolService.querySchool(filter, options);
  res.send(result);
});

const getSchoolsByBlock = catchAsync(async (req, res) => {
  const  block  = req.user.asssignedTo;
  const filter = { block };
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

const getDistrictList = catchAsync(async (req, res) => {
  const districtList = await schoolService.getDistrictList();
  res.send(districtList);
});

const getBlockList = catchAsync(async (req, res) => {
  const district = req.body.district;
  const districtList = await schoolService.getBlockList(district);
  res.send(districtList);
});


const getSchoolByFilter = catchAsync(async (req) => {
  // eslint-disable-next-line no-unused-vars
  const {district, block} = req.query;
  // const school = await schoolService.getSchoolByFilter(district, block);
  // if (!school) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'school not found');
  // }
  // res.send(school);
});

module.exports = {
  createSchool,
  getSchools,
  getSchoolsByDistrict,
  getSchoolsByBlock,
  getSchool,
  getDistrictList,
  getBlockList,
  getSchoolByFilter
};
