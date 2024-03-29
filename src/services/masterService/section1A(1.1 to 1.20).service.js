const httpStatus = require('http-status');
const Section1A20Schema = require('../../models/masterModels/section1A(1.11 to 1.20).model');
const ApiError = require('../../utils/ApiError');

/**
 * Get Section1A20Schema by id
 * @param {ObjectId} id
 * @returns {Promise<Section1A20Schema>}
 */
const getSection1A20ById = async (scode) => {
  return Section1A20Schema.findOne({ scode });
};

/**
 * Create a Section1A20Schema
 * @param {Object} Section1A20SchemaBody
 * @returns {Promise<Section1A20Schema>}
 */
// const createSection1A20 = async (Section1A20SchemaBody) => {
//   return Section1A20Schema.create(Section1A20SchemaBody);
// };

const createSection1A20 = async (scode, reqBody) => {
  let result = await getSection1A20ById(scode);
  if (!result) {
    // Create a new instance of Section1A10Schema if not found
    result = new Section1A20Schema(reqBody);
  } else {
    // Update existing instance with new data
    Object.assign(result, reqBody);
  }
  // Save the instance
  await result.save();
  return result;
};
/**
 * Query for Section1A20
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllSection1A20 = async (filter, options) => {
  const Section1A20 = await Section1A20Schema.paginate(filter, options);
  return Section1A20;
};

/**
 * Update Section1A20Schema by id
 * @param {ObjectId} Section1A20Id
 * @param {Object} updateBody
 * @returns {Promise<Section1A20Schema>}
 */
const updateSection1A20ById = async (scode, updateBody) => {
  const typeSection1A20 = await getSection1A20ById(scode);
  if (!typeSection1A20) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section1A20 not found');
  }
  Object.assign(typeSection1A20, updateBody);
  await typeSection1A20.save();
  return typeSection1A20;
};

/**
 * Delete Section1A20Schema by id
 * @param {ObjectId} Section1A20Id
 * @returns {Promise<Section1A20Schema>}
 */
const deleteSection1A20ById = async (scode) => {
  const Section1A20 = await getSection1A20ById(scode);
  if (!Section1A20) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section1A20 not found');
  }
  await Section1A20.remove();
  return Section1A20;
};

module.exports = {
  createSection1A20,
  getAllSection1A20,
  getSection1A20ById,
  updateSection1A20ById,
  deleteSection1A20ById,
};
