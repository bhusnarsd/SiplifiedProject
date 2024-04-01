const { Section1A10Schema, Section1A20Schema, Section1A30Schema } = require('../models');

const getSchoolCategoryCounts = async () => {
  const schoolCategoryCounts = await Section1A20Schema.aggregate([
    {
      $group: {
        _id: '$schoolcategory',
        count: { $sum: 1 },
      },
    },
  ]);
  const streamCounts = await Section1A20Schema.aggregate([
    {
      $group: {
        _id: null,
        artsCount: { $sum: { $cond: [{ $eq: ['$arts', 'Arts'] }, 1, 0] } },
        scienceCount: { $sum: { $cond: [{ $eq: ['$science', 'Science'] }, 1, 0] } },
        commerceCount: { $sum: { $cond: [{ $eq: ['$commerce', 'Commerce'] }, 1, 0] } },
        vocationalCount: { $sum: { $cond: [{ $eq: ['$Vocational', 'Vocational'] }, 1, 0] } },
        otherStreamsCount: { $sum: { $cond: [{ $eq: ['$Streams', 'Streams'] }, 1, 0] } },
      },
    },
    {
      $project: {
        _id: 0,
        artsCount: 1,
        scienceCount: 1,
        commerceCount: 1,
        vocationalCount: 1,
        otherStreamsCount: 1,
      },
    },
  ]);
  const typeOfSchoolCounts = await Section1A20Schema.aggregate([
    {
      $group: {
        _id: '$typeschool',
        count: { $sum: 1 },
      },
    },
  ]);
  const typeOfSchoolCounts2 = await Section1A30Schema.aggregate([
    {
      $group: {
        _id: '$cwsnschool',
        count: { $sum: 1 },
      },
    },
  ]);
  const typeOfSchoolCounts3 = await Section1A30Schema.aggregate([
    {
      $group: {
        _id: '$minorityschool',
        count: { $sum: 1 },
      },
    },
  ]);

  const schoolLocationCount = await Section1A10Schema.aggregate([
    {
      $group: {
        _id: '$typeofschool',
        count: { $sum: 1 },
      },
    },
  ]);
  let data = {
    schoolCategoryCounts,
    streamCounts,
    typeOfSchoolCounts,
    typeOfSchoolCounts2,
    typeOfSchoolCounts3,
    schoolLocationCount,
  };
  return data;
};

module.exports = {
  getSchoolCategoryCounts,
};
