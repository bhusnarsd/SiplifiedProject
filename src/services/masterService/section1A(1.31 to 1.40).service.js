const httpStatus = require('http-status');
const Section1A40Schema = require('../../models/masterModels/section1A(1.31 to 1.40).model');
const ApiError = require('../../utils/ApiError');

/**
 * Get Section1A40Schema by id
 * @param {ObjectId} id
 * @returns {Promise<Section1A40Schema>}
 */
const getSection1A40ById = async (scode) => {
  return Section1A40Schema.findOne({ scode });
};

/**
 * Create a Section1A40Schema
 * @param {Object} Section1A40SchemaBody
 * @returns {Promise<Section1A40Schema>}
 */
const createSection1A40 = async (scode, reqBody) => {
  let result = await getSection1A40ById(scode);
  if (!result) {
    // Create a new instance of Section1A10Schema if not found
    result = new Section1A40Schema(reqBody);
  } else {
    // Update existing instance with new data
    Object.assign(result, reqBody);
  }
  // Save the instance
  await result.save();
  return result;
};

/**
 * Query for Section1A40
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllSection1A40 = async (filter, options) => {
  const Section1A40 = await Section1A40Schema.paginate(filter, options);
  return Section1A40;
};

/**
 * Update Section1A40Schema by id
 * @param {ObjectId} Section1A40Id
 * @param {Object} updateBody
 * @returns {Promise<Section1A40Schema>}
 */
const updateSection1A40ById = async (scode, updateBody) => {
  const typeSection1A40 = await getSection1A40ById(scode);
  if (!typeSection1A40) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section1A40 not found');
  }
  Object.assign(typeSection1A40, updateBody);
  await typeSection1A40.save();
  return typeSection1A40;
};

/**
 * Delete Section1A40Schema by id
 * @param {ObjectId} Section1A40Id
 * @returns {Promise<Section1A40Schema>}
 */
const deleteSection1A40ById = async (scode) => {
  const Section1A40 = await getSection1A40ById(scode);
  if (!Section1A40) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section1A40 not found');
  }
  await Section1A40.remove();
  return Section1A40;
};

module.exports = {
  createSection1A40,
  getAllSection1A40,
  getSection1A40ById,
  updateSection1A40ById,
  deleteSection1A40ById,
};
