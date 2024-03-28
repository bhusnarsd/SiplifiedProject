/* eslint-disable prettier/prettier */
// const httpStatus = require('http-status');
const { School } = require('../models');
// const ApiError = require('../utils/ApiError');

/**
 * Create a school
 * @param {Object} reqBody
 * @returns {Promise<User>}
 */
const createSchool = async (reqBody) => {
  return School.create(reqBody);
};

/**
 * Query for school
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySchool = async (filter, options) => {
  const school = await School.paginate(filter, options);
  return school;
};

// /**
//  * Get user by id
//  * @param {ObjectId} id
//  * @returns {Promise<School>}
//  */
// const getSchoolById = async (id) => {
//   return School.findById(id);
// };

/**
 * Get user by udisecode
 * @param {string} udisecode
 * @returns {Promise<School>}
 */
const getSchoolByUdisecode = async (udisecode) => {
  return School.findOne({ udisecode });
};

/**
 * Get user by udisecode
 * @param {string} udisecode
 * @returns {Promise<School>}
 */
const getSchoolStatAll = async (filter) => {
  const result = await School.aggregate([
    {
      $match: filter
    },
    {
      $group: {
        _id: null,
        totalStudents: { $sum: '$student' },
        totalStaff: { $sum: '$staff' }
      }
    }
  ]);
  const totalSchool = await School.countDocuments(filter);
  const { totalStudents, totalStaff } = result[0];

  return {
    totalSchool,
    totalStudents,
    totalStaff
  };
};


/**
 * Get user by udisecode
 * @param {string} udisecode
 * @returns {Promise<School>}
 */
const getSchoolCountDistrict = async () => {
  const result = await School.aggregate([
    {
      $group: {
        _id: '$district',
        totalSchools: { $sum: 1 },
      }
    }
  ]);

  return  result;
};

/**
 * Get user by udisecode
 * @param {string} udisecode
 * @returns {Promise<School>}
 */
const getSchoolCountByBlock = async (district) => {
  const result = await School.aggregate([
    {
      $match: {district}
    },
    {
      $group: {
        _id: '$block',
        totalSchools: { $sum: 1 },
      }
    }
  ]);

  return  result;
};
/**
 * Get user by udisecode
 * @param {string} district
 * @returns {Promise<School>}
 */
const getSchoolByFilter = async (district, block) => {
  const filters = {};
  if (district) filters.district = district;
  if (block) filters.block = block;
  return School.find(filters);
};

/**
 * Get district names
 * @returns {Promise<School>}
 */
const getDistrictList = async() => {
    const district = await School.find({}, { district: 1,  }).distinct('district');
    return district
};

/**
 * Get block names
 * @param {string} district
 * @returns {Promise<School>}
 */
const getBlockList = async(district) => {
  const block = await School.find({ district }, { block: 1,  }).distinct('block');
  return block
}

/**
 * Get block names
 * @param {string} block
 * @returns {Promise<School>}
 */
const getSchoolList = async (block) => {
    const schools = await School.find({ block }, { name: 1 , code: 1,})
    return schools;
};


/**
Retrieves the count of male and female students by state and class.
// @param {string} - The district to filter the schools by.
@returns {Promise<Array>} - A promise that resolves to an array of objects containing the state, class, male count, and female count.
*/
const getStudentClassWiseCount = async (filter) => {
  const result = await School.aggregate([
    { $match: filter },
    { $unwind: "$resultlist" },
    {
      $group: {
        _id:  "$resultlist.class",
        maleCount: { $sum: "$resultlist.male" },
        femaleCount: { $sum: "$resultlist.female" }
      }
    },

  ]);  
  return result
};

/**
 * Get user by udisecode
 * @param {string} udisecode
 * @returns {Promise<School>}
 */
const getSchoolStat = async (filter, role) => {
    const result = await School.aggregate([
      { $match: filter },
      {
        $group: {
          _id: `$${role}`,
          total_student: { $sum: "$total_student" },
          total_teacher: { $sum: "$total_teacher" }
        }
      }
    ]);
    const totalSchool = await School.countDocuments(filter);
    return {result, totalSchool};
};

/**
Function to get school division wise data
@param {string} division - The division to filter the schools
@returns {Object} - An object containing the result and total number of schools
*/
const getSchoolDivisionWise = async (division) => {
  const result = await School.aggregate([
    { $match: {division} },
    {
      $group: {
        _id: `$district`,
        total_student: { $sum: "$total_student" },
        total_teacher: { $sum: "$total_teacher" }
      }
    }
  ]);
const totalSchool = await School.countDocuments({division});
  return {result, totalSchool};
};


const getSchoolDistrictWise = async (district) => {
  const result = await School.aggregate([
    { $match: {district} },
    {
      $group: {
        _id: `$block`,
        total_student: { $sum: "$total_student" },
        total_teacher: { $sum: "$total_teacher" }
      }
    }
  ]);
const totalSchool = await School.countDocuments({district});
  return {result, totalSchool};
};

const getSchoolBlockWise = async (block) => {
  const result = await School.aggregate([
    { $match: {block} },
    {
      $group: {
        _id: `$name`,
        total_student: { $sum: "$total_student" },
        total_teacher: { $sum: "$total_teacher" }
      }
    }
  ]);
const totalSchool = await School.countDocuments({block});
  return {result, totalSchool};
};

module.exports = {
  createSchool,
  querySchool,
  getSchoolStat,
  getSchoolList,
  getSchoolCountDistrict,
  getSchoolCountByBlock,
  getSchoolByUdisecode,
  getSchoolByFilter,
  getDistrictList,
  getBlockList,
  getSchoolStatAll,
  getStudentClassWiseCount,
  getSchoolDivisionWise,
  getSchoolDistrictWise,
  getSchoolBlockWise,
 };
