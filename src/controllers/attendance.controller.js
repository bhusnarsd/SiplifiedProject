const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { attendanceService } = require('../services');

const getAllAttendanceCount = catchAsync(async (req, res) => {
  const result = await attendanceService.getAllAttendanceCount();
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attendance not found');
  }
  res.send(result);
});

module.exports = {
  getAllAttendanceCount,
};
