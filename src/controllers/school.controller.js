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
  let filter = {};
  const role = req.user.role;
  const assignedTo = req.user.asssignedTo;

  if (role === 'district_officer') {
    filter = { district: assignedTo };
  } else if (role === 'block_officer') {
    filter = { block: assignedTo };
  } else if (role === 'state_officer') {
    // No specific filtering needed for state officer
  }

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await schoolService.querySchool(filter, options);
  res.send(result);
});

const getSchoolsStats = catchAsync(async (req, res) => {
  let filter = {};
  const role = req.user.role;
  const assignedTo = req.user.asssignedTo;

  if (role === 'district_officer') {
    filter = { district: assignedTo };
  } else if (role === 'block_officer') {
    filter = { block: assignedTo };
  } else if (role === 'state_officer') {
    // No specific filtering needed for state officer
  }

  const result = await schoolService.getSchoolStat(filter);
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
  getSchool,
  getDistrictList,
  getBlockList,
  getSchoolByFilter,
  getSchoolsStats
};
