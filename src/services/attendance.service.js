/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const { Attendance } = require('../models');
const ApiError = require('../utils/ApiError');


const getAttendanceByScodeAndDate = async (scode, date) => {
    return Attendance.findOne({scode, date});
  };
/**
 * Create a attendance
 * @param {Object} reqBody
 * @returns {Promise<Attendance>}
 */
const createAttendance = async (scode, date, reqBody) => {
    let result = await getAttendanceByScodeAndDate({scode, date});
  if (!result) {
   result = await Attendance.create(reqBody);
  }
  Object.assign(result, reqBody);
  await result.save();
  return result;
};

/**
 * Query for sansthan
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAttendance = async (filter, options) => {
  const result = await Attendance.paginate(filter, options);
  return result;
};

const getAttendanceById = async (id) => {
  return Attendance.findById(id);
};
/**
 * Update user by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Attendance>}
 */
const updateAttendanceById = async (id, updateBody) => {
  const result = await getAttendanceById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attendance not found');
  }
  Object.assign(result, updateBody);
  await result.save();
  return result;
};

module.exports = {
  createAttendance,
  queryAttendance,
  getAttendanceById,
  updateAttendanceById,
};
