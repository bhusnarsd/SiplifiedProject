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

const geDataAnalysisCounts = catchAsync(async (req, res) => {
  try {
    const schoolCategoryCounts = await schoolAnalysisService.geDataAnalysisCounts();
    res.status(httpStatus.OK).send(schoolCategoryCounts);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error');
  }
});

const geDataAnalysisCounts3 = catchAsync(async (req, res) => {
  try {
    const schoolCategoryCounts = await schoolAnalysisService.geDataAnalysisCounts3();
    res.status(httpStatus.OK).send(schoolCategoryCounts);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error');
  }
});

const geDataAnalysisCounts4 = catchAsync(async (req, res) => {
  try {
    const schoolCategoryCounts = await schoolAnalysisService.geDataAnalysisCounts4();
    res.status(httpStatus.OK).send(schoolCategoryCounts);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error');
  }
});
module.exports = {
  getSchoolCategoryCounts,
  geDataAnalysisCounts,
  geDataAnalysisCounts3,
  geDataAnalysisCounts4,
};
