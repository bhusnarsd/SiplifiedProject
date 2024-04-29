const {
  Section1A10Schema,
  Section1A20Schema,
  Section1A30Schema,
  Section1E62Schema,
  Section2A21Schema,
  Section2B27Schema,
  Section3ASchema,
  Teacher,
  School,
} = require('../models');

//  state wise anyalysis

const getSchoolCategoryCounts = async () => {
  // Execute all aggregation queries concurrently
  const [
    schoolCategoryCounts,
    streamCounts,
    typeOfSchoolCounts,
    SchoolshavingPrePrimarySection,
    specialSchoolCount,
    minoritySchoolCount,
    schoolLocationCount,
  ] = await Promise.allSettled([
    Section1A20Schema.aggregate([{ $group: { _id: '$schoolcategory', count: { $sum: 1 } } }]),
    Section1A20Schema.aggregate([
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
    ]),
    Section1A20Schema.aggregate([{ $group: { _id: '$typeschool', count: { $sum: 1 } } }]),
    Section2A21Schema.countDocuments({ schoolcwsn: '1' }),
    Section1A30Schema.aggregate([{ $group: { _id: '$cwsnschool', count: { $sum: 1 } } }]),
    Section1A30Schema.aggregate([{ $group: { _id: '$minorityschool', count: { $sum: 1 } } }]),
    Section1A10Schema.aggregate([{ $group: { _id: '$typeofschool', count: { $sum: 1 } } }]),
  ]);

  // Handle results and set count to 0 if data is not found
  const data = {
    schoolCategoryCounts: schoolCategoryCounts.status === 'fulfilled' ? schoolCategoryCounts.value : [],
    streamCounts: streamCounts.status === 'fulfilled' ? streamCounts.value : [],
    typeOfSchoolCounts: typeOfSchoolCounts.status === 'fulfilled' ? typeOfSchoolCounts.value : [],
    SchoolshavingPrePrimarySection:
      SchoolshavingPrePrimarySection.status === 'fulfilled' ? SchoolshavingPrePrimarySection.value : 0,
    specialSchoolCount: specialSchoolCount.status === 'fulfilled' ? specialSchoolCount.value : [],
    minoritySchoolCount: minoritySchoolCount.status === 'fulfilled' ? minoritySchoolCount.value : [],
    schoolLocationCount: schoolLocationCount.status === 'fulfilled' ? schoolLocationCount.value : [],
  };

  return data;
};

// district wise anyalysis

const getSchoolCategoryCountsDistrict = async (district) => {
  const schools = await School.find({ district }, 'code');

  // Step 2: Extract school codes from the retrieved schools
  const schoolCodes = schools.map((school) => school.code);
  // Execute all aggregation queries concurrently
  const [
    schoolCategoryCounts,
    streamCounts,
    typeOfSchoolCounts,
    SchoolshavingPrePrimarySection,
    specialSchoolCount,
    minoritySchoolCount,
    schoolLocationCount,
  ] = await Promise.allSettled([
    Section1A20Schema.aggregate([
      {
        $match: {
          scode: { $in: schoolCodes }, // Filter by school codes
        },
      },
      { $group: { _id: '$schoolcategory', count: { $sum: 1 } } },
    ]),
    Section1A20Schema.aggregate([
      {
        $match: {
          scode: { $in: schoolCodes }, // Filter by school codes
        },
      },
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
    ]),
    Section1A20Schema.aggregate([
      {
        $match: {
          scode: { $in: schoolCodes }, // Filter by school codes
        },
      },
      { $group: { _id: '$typeschool', count: { $sum: 1 } } },
    ]),
    Section2A21Schema.countDocuments({ scode: { $in: schoolCodes }, schoolcwsn: '1' }),
    Section1A30Schema.aggregate([
      {
        $match: {
          scode: { $in: schoolCodes }, // Filter by school codes
        },
      },
      { $group: { _id: '$cwsnschool', count: { $sum: 1 } } },
    ]),
    Section1A30Schema.aggregate([
      {
        $match: {
          scode: { $in: schoolCodes }, // Filter by school codes
        },
      },
      { $group: { _id: '$minorityschool', count: { $sum: 1 } } },
    ]),
    Section1A10Schema.aggregate([
      {
        $match: {
          scode: { $in: schoolCodes }, // Filter by school codes
        },
      },
      { $group: { _id: '$typeofschool', count: { $sum: 1 } } },
    ]),
  ]);

  // Handle results and set count to 0 if data is not found
  const data = {
    schoolCategoryCounts: schoolCategoryCounts.status === 'fulfilled' ? schoolCategoryCounts.value : [],
    streamCounts: streamCounts.status === 'fulfilled' ? streamCounts.value : [],
    typeOfSchoolCounts: typeOfSchoolCounts.status === 'fulfilled' ? typeOfSchoolCounts.value : [],
    SchoolshavingPrePrimarySection:
      SchoolshavingPrePrimarySection.status === 'fulfilled' ? SchoolshavingPrePrimarySection.value : 0,
    specialSchoolCount: specialSchoolCount.status === 'fulfilled' ? specialSchoolCount.value : [],
    minoritySchoolCount: minoritySchoolCount.status === 'fulfilled' ? minoritySchoolCount.value : [],
    schoolLocationCount: schoolLocationCount.status === 'fulfilled' ? schoolLocationCount.value : [],
  };
  return data;
};

const geDataAnalysisCounts = async () => {
  // Execute all aggregation queries concurrently
  const [
    schoolbyManagement,
    schoolManagmentGroup,
    SchoolsbyAffiliationBoardOfSecondary,
    SchoolsbyAffiliationBoardOfHighSecondary,
    VocationalEducationalDetails,
    noOfSchoolHavingSecAndHigh,
  ] = await Promise.allSettled([
    Section1A20Schema.aggregate([{ $group: { _id: '$mangcode', count: { $sum: 1 } } }]),
    Section1A20Schema.aggregate([{ $group: { _id: '$manggroup', count: { $sum: 1 } } }]),
    Section1A20Schema.aggregate([{ $group: { _id: '$affilationBoard', count: { $sum: 1 } } }]),
    Section1A30Schema.aggregate([{ $group: { _id: '$affilationBoardHigherSecondary', count: { $sum: 1 } } }]),
    Section1E62Schema.aggregate([{ $group: { _id: '$vocationalNSQF', count: { $sum: 1 } } }]),
    Section1A20Schema.aggregate([{ $group: { _id: '$schoolcategory', count: { $sum: 1 } } }]),
  ]);

  // Handle results and set count to 0 if data is not found
  const data = {
    schoolbyManagement: schoolbyManagement.status === 'fulfilled' ? schoolbyManagement.value : [],
    // eslint-disable-next-line eqeqeq
    schoolManagmentGroup: schoolManagmentGroup.status == 'fulfilled' ? schoolManagmentGroup.value : [],
    SchoolsbyAffiliationBoardOfSecondary:
      SchoolsbyAffiliationBoardOfSecondary.status === 'fulfilled' ? SchoolsbyAffiliationBoardOfSecondary.value : [],
    SchoolsbyAffiliationBoardOfHighSecondary:
      SchoolsbyAffiliationBoardOfHighSecondary.status === 'fulfilled' ? SchoolsbyAffiliationBoardOfHighSecondary.value : [],
    VocationalEducationalDetails:
      VocationalEducationalDetails.status === 'fulfilled' ? VocationalEducationalDetails.value : [],
    noOfSchoolHavingSecAndHigh: noOfSchoolHavingSecAndHigh.status === 'fulfilled' ? noOfSchoolHavingSecAndHigh.value : [],
  };

  return data;
};

const geDataAnalysisCounts3 = async () => {
  // Execute all aggregation queries concurrently
  const [
    buildingTypewiseSchoolCount,
    schoolswithICTLab,
    schoolBulidingUnderConst,
    functionalToiletCount,
    functionalDrinkingWaterCount,
    functionalElectricityCount,
    libraryCount,
    playgroundaCount,
    landCount,
    furnitureCount,
    functionalComputerCount,
    internetCount,
    minoritySchoolCount,
    classroomCount,
  ] = await Promise.allSettled([
    Section2A21Schema.aggregate([
      {
        $group: {
          _id: '$statusofschoolbuilding',
          count: { $sum: 1 },
        },
      },
    ]),
    Section2B27Schema.aggregate([
      {
        $group: {
          _id: '$ictlab',
          count: { $sum: 1 },
        },
      },
    ]),
    Section2A21Schema.aggregate([
      {
        $match: {
          noofbuildingunderconst: { $gt: '0' },
        },
      },
      {
        $group: {
          _id: null,
          totalSchools: { $sum: 1 },
        },
      },
    ]),
    Section2A21Schema.countDocuments({
      schooltoilet: '1',
      nooftoiletsrunningwatersboys: { $gt: '0' },
      nooftoiletsrunningwatergirls: { $gt: '0' },
    }),
    Section2A21Schema.countDocuments({ drinkingwater: '1' }),
    Section2A21Schema.countDocuments({ electricityavai: '1' }),
    Section2A21Schema.countDocuments({ libraryavai: '1' }),
    Section2A21Schema.countDocuments({ playgroundavai: '1' }),
    Section2A21Schema.countDocuments({ landavaiforexpansionofschool: '1' }),
    Section2A21Schema.countDocuments({ furnitureforstduent: '1' }),
    Section2A21Schema.countDocuments({
      functpcavai: { $gt: '0' },
      functlaptopavai: { $gt: '0' },
    }),
    Section2A21Schema.countDocuments({ internetf: '1' }),
    Section1A30Schema.countDocuments({ minorityschool: '1' }),
    Section2A21Schema.countDocuments({ noofclassroomforinstructpurpose: { $gt: '0' } }),
  ]);

  // Handle results and set count to 0 if data is not found
  const data = {
    buildingTypewiseSchoolCount: buildingTypewiseSchoolCount.status === 'fulfilled' ? buildingTypewiseSchoolCount.value : [],
    buildingUnderConst:
      // eslint-disable-next-line no-nested-ternary
      schoolBulidingUnderConst.status === 'fulfilled'
        ? schoolBulidingUnderConst.value.length > 0
          ? schoolBulidingUnderConst.value[0].totalSchools
          : 0
        : 0,
    schoolswithICTLab: schoolswithICTLab.status === 'fulfilled' ? schoolswithICTLab.value : [],
    classroomCount: classroomCount.status === 'fulfilled' ? classroomCount.value : 0,
    functionalToiletCount: functionalToiletCount.status === 'fulfilled' ? functionalToiletCount.value : 0,
    functionalDrinkingWaterCount:
      functionalDrinkingWaterCount.status === 'fulfilled' ? functionalDrinkingWaterCount.value : 0,
    functionalElectricityCount: functionalElectricityCount.status === 'fulfilled' ? functionalElectricityCount.value : 0,
    libraryCount: libraryCount.status === 'fulfilled' ? libraryCount.value : 0,
    playgroundaCount: playgroundaCount.status === 'fulfilled' ? playgroundaCount.value : 0,
    landCount: landCount.status === 'fulfilled' ? landCount.value : 0,
    furnitureCount: furnitureCount.status === 'fulfilled' ? furnitureCount.value : 0,
    functionalComputerCount: functionalComputerCount.status === 'fulfilled' ? functionalComputerCount.value : 0,
    internetCount: internetCount.status === 'fulfilled' ? internetCount.value : 0,
    minoritySchoolCount: minoritySchoolCount.status === 'fulfilled' ? minoritySchoolCount.value : 0,
  };

  return data;
};

const geDataAnalysisCounts4 = async () => {
  const aggregationPipeline = [
    {
      $group: {
        _id: null,
        totalRegularTeachers: { $sum: { $toInt: '$noforegularteacher' } },
        totalNonRegularStaff: { $sum: { $toInt: '$nofononregularstaff' } },
      },
    },
  ];

  const result = await Section3ASchema.aggregate(aggregationPipeline);

  // Extract the counts from the result
  const counts = result[0];

  const aggregationPipeline2 = [
    {
      $group: {
        _id: '$gender',
        count: { $sum: 1 },
      },
    },
  ];

  const count2 = await Teacher.aggregate(aggregationPipeline2);

  // Construct an object with counts for each gender
  const genderCounts = {};
  count2.forEach(({ _id, count }) => {
    genderCounts[_id] = count;
  });

  const aggregationPipeline3 = [
    {
      $group: {
        _id: '$caste',
        count: { $sum: 1 },
      },
    },
  ];

  const count = await Teacher.aggregate(aggregationPipeline3);

  // Construct an object with counts for each gender
  const categoryCount = {};
  // eslint-disable-next-line no-shadow
  count.forEach(({ _id, count }) => {
    categoryCount[_id] = count;
  });
  const aggregationPipeline4 = [
    {
      $project: {
        age: 1,
        isUnder18: { $lt: ['$age', 18] },
        isOver60: { $gt: ['$age', 60] },
      },
    },
    {
      $group: {
        _id: null,
        under18Count: { $sum: { $cond: [{ $eq: ['$isUnder18', true] }, 1, 0] } },
        over60Count: { $sum: { $cond: [{ $eq: ['$isOver60', true] }, 1, 0] } },
      },
    },
  ];

  const ageCount = await Teacher.aggregate(aggregationPipeline4);

  // Extract counts from the result
  const { under18Count, over60Count } = ageCount.length > 0 ? ageCount[0] : { under18Count: 0, over60Count: 0 };

  const data = {
    counts,
    genderCounts,
    categoryCount,
    under18Count,
    over60Count,
  };

  return data;
};

module.exports = {
  getSchoolCategoryCounts,
  geDataAnalysisCounts,
  getSchoolCategoryCountsDistrict,
  geDataAnalysisCounts3,
  geDataAnalysisCounts4,
};
