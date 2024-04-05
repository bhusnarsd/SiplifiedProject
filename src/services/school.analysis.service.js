const {
  Section1A10Schema,
  Section1A20Schema,
  Section1A30Schema,
  Section1E62Schema,
  Section2A21Schema,
  Section2B27Schema,
} = require('../models');

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
  const SchoolshavingPrePrimarySection = await Section2A21Schema.countDocuments({
    schoolcwsn: '1',
  });

  const specialSchoolCount = await Section1A30Schema.aggregate([
    {
      $group: {
        _id: '$cwsnschool',
        count: { $sum: 1 },
      },
    },
  ]);
  const minoritySchoolCount = await Section1A30Schema.aggregate([
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
  const data = {
    schoolCategoryCounts,
    SchoolshavingPrePrimarySection,
    streamCounts,
    typeOfSchoolCounts,
    specialSchoolCount,
    minoritySchoolCount,
    schoolLocationCount,
  };
  return data;
};

const geDataAnalysisCounts = async () => {
  const schoolbyManagement = await Section1A20Schema.aggregate([
    {
      $group: {
        _id: '$mangcode',
        count: { $sum: 1 },
      },
    },
  ]);
  const SchoolsbyAffiliationBoardOfSecondary = await Section1A20Schema.aggregate([
    {
      $group: {
        _id: '$affilationBoard',
        count: { $sum: 1 },
      },
    },
  ]);
  const SchoolsbyAffiliationBoardOfHighSecondary = await Section1A30Schema.aggregate([
    {
      $group: {
        _id: '$affilationBoardHigherSecondary',
        count: { $sum: 1 },
      },
    },
  ]);
  const VocationalEducationalDetails = await Section1E62Schema.aggregate([
    {
      $group: {
        _id: '$vocationalNSQF',
        count: { $sum: 1 },
      },
    },
  ]);

  const noOfSchoolHavingSecAndHigh = await Section1A20Schema.aggregate([
    {
      $group: {
        _id: '$schoolcategory',
        count: { $sum: 1 },
      },
    },
  ]);

  const data = {
    schoolbyManagement,
    SchoolsbyAffiliationBoardOfSecondary,
    SchoolsbyAffiliationBoardOfHighSecondary,
    VocationalEducationalDetails,
    noOfSchoolHavingSecAndHigh,
  };
  return data;
};

const geDataAnalysisCounts3 = async () => {
  const buildingTypewiseSchoolCount = await Section2A21Schema.aggregate([
    {
      $group: {
        _id: '$statusofschoolbuilding',
        count: { $sum: 1 },
      },
    },
  ]);

  const schoolswithICTLab = await Section2B27Schema.aggregate([
    {
      $group: {
        _id: '$ictlab',
        count: { $sum: 1 },
      },
    },
  ]);

  const schoolBulidingUnderConst = await Section2A21Schema.aggregate([
    {
      $match: {
        noofbuildingunderconst: { $gt: '0' }, // Match documents where noofbuildingunderconst is greater than "0"
      },
    },
    {
      $group: {
        _id: null,
        totalSchools: { $sum: 1 }, // Count the number of documents in the result set
      },
    },
  ]);

  const functionalToiletCount = await Section2A21Schema.countDocuments({
    schooltoilet: '1',
    nooftoiletsrunningwatersboys: { $gt: '0' },
    nooftoiletsrunningwatergirls: { $gt: '0' },
  });

  const functionalDrinkingWaterCount = await Section2A21Schema.countDocuments({
    drinkingwater: '1',
  });
  const functionalElectricityCount = await Section2A21Schema.countDocuments({
    electricityavai: '1',
  });

  const buildingUnderConst = schoolBulidingUnderConst[0].totalSchools;

  const data = {
    buildingTypewiseSchoolCount,
    buildingUnderConst,
    schoolswithICTLab,
    functionalToiletCount,
    functionalDrinkingWaterCount,
    functionalElectricityCount,
  };

  return data;
};

module.exports = {
  getSchoolCategoryCounts,
  geDataAnalysisCounts,
  geDataAnalysisCounts3,
};
