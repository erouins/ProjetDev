const httpStatus = require('http-status');
const { User, Client, Restaurant, Delivery } = require('../models');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');
const bcrypt = require('bcryptjs');


const createUser = async (userBody) => {

  let user = await User.findOne({ where: { email: email } });
  if (user != null) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'This email is already used !');
  }
  const hash = await bcrypt.hash(userBody.password, 10);
  const user = new User({
    password : hash ,
    email : userBody.email,
    firstName : userBody.firstName,
    lastName : userBody.lastName,
    accountType : userBody.accountType
  });



  user.save(user).then(data => {
      res.send(data)
  })
  .catch(err => {
    throw new ApiError(httpStatus[500], 'Error : User not created');
  });
};


/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Update user profil
 * @param {ObjectId} userId
 * @param {Object} updateBody
 */

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};




module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
