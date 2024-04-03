const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { schoolAnalysisService } = require('../services');

const getSchoolCategoryCounts = catchAsync(async (req, res) => {
  try {
    const schoolCategoryCounts = await schoolAnalysisService.getSchoolCategoryCounts();
    res.status(httpStatus.OK).send(schoolCategoryCounts);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error');
  }
});

module.exports = {
  getSchoolCategoryCounts,
};
