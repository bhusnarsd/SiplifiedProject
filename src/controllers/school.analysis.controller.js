const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { schoolAnalysisService } = require('../services');

const getSchoolCategoryCounts = catchAsync(async (req, res) => {
  const schoolCategoryCounts = await schoolAnalysisService.getSchoolCategoryCounts();

  if (!schoolCategoryCounts) {
    res.status(httpStatus.OK).send([]);
  }
  res.status(httpStatus.OK).send(schoolCategoryCounts);
});
const getSchoolCategoryCountsDistrict = catchAsync(async (req, res) => {
  const schoolCategoryCounts = await schoolAnalysisService.getSchoolCategoryCountsDistrict(req.body.district);

  if (!schoolCategoryCounts) {
    res.status(httpStatus.OK).send([]);
  }
  res.status(httpStatus.OK).send(schoolCategoryCounts);
});

const geDataAnalysisCounts = catchAsync(async (req, res) => {
  const schoolCategoryCounts = await schoolAnalysisService.geDataAnalysisCounts();
  if (!schoolCategoryCounts) {
    res.status(httpStatus.OK).send([]);
  }
  res.status(httpStatus.OK).send(schoolCategoryCounts);
});

const geDataAnalysisCounts3 = catchAsync(async (req, res) => {
  const schoolCategoryCounts = await schoolAnalysisService.geDataAnalysisCounts3();
  if (!schoolCategoryCounts) {
    res.status(httpStatus.OK).send([]);
  }
  res.status(httpStatus.OK).send(schoolCategoryCounts);
});

const geDataAnalysisCounts4 = catchAsync(async (req, res) => {
  const schoolCategoryCounts = await schoolAnalysisService.geDataAnalysisCounts4();
  if (!schoolCategoryCounts) {
    res.status(httpStatus.OK).send([]);
  }
  res.status(httpStatus.OK).send(schoolCategoryCounts);
});
module.exports = {
  getSchoolCategoryCounts,
  getSchoolCategoryCountsDistrict,
  geDataAnalysisCounts,
  geDataAnalysisCounts3,
  geDataAnalysisCounts4,
};
