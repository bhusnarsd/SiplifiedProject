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

// /**
//  * Update user by id
//  * @param {ObjectId} udisecode
//  * @param {Object} updateBody
//  * @returns {Promise<School>}
//  */
// const updateUserById = async (udisecode, updateBody) => {
//   const school = await getSchoolByUdisecode(udisecode);
//   if (!school) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'School not found');
//   }
//   Object.assign(school, updateBody);
//   await school.save();
//   return school;
// };

// /**
//  * Delete user by id
//  * @param {ObjectId} userId
//  * @returns {Promise<User>}
//  */
// const deleteUserById = async (userId) => {
//   const user = await getUserById(userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   await user.remove();
//   return user;
// };

module.exports = {
  createSchool,
  querySchool,
  // getUserById,
  getSchoolByUdisecode,
  //   updateUserById,
  //   deleteUserById,
};
