/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { attendanceService } = require('../services');

const createAttendance = catchAsync(async (req, res) => {
  const teacher = await attendanceService.createAttendance(req.body);
  res.status(httpStatus.CREATED).send(teacher);
});

const queryAttendance = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await attendanceService.queryAttendance(filter, options);
  res.send(result);
});

const getAttendanceById = catchAsync(async (req, res) => {
  const result = await attendanceService.getAttendanceById(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  res.send(result);
});

const updateAttendanceById = catchAsync(async (req, res) => {
  const result = await attendanceService.updateAttendanceById(req.params.id, req.body);
  res.send(result);
});

module.exports = {
    createAttendance,
    queryAttendance,
    getAttendanceById,
    updateAttendanceById,
};
