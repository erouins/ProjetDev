const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const bcrypt = require('bcrypt');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const { User } = require('../models');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {

  console.log(email);
  console.log(password);

  // Validation des données reçues
  if (!email || !password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'no email or password');
  }

  try {
    // Vérification si l'utilisateur existe
    let user = await User.findOne({ where: { email: email } });
    if (user === null) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'This account does not exists !');
    }
    // Vérification du mot de passe
    let test = await bcrypt.compare(password, user.password)
    if (!test) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Wrong password');
    }
    
    return user;
  } catch (err) {
    console.log(err)
    if (err.name == 'SequelizeDatabaseError') {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Database error');
    }
    
     throw new ApiError(httpStatus.UNAUTHORIZED, 'Login proccess failed');
     
  }
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {

    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    console.log("resetPasswordTokenDoc.user ID: " + resetPasswordTokenDoc.user)
    if (!user) {
      throw new Error();
    }

    const hash = await bcrypt.hash(newPassword, 10);

    await userService.updateUserById(user.id, { password: hash });
    await Token.destroy({
      where: {
        user: user.id, type: tokenTypes.RESET_PASSWORD 
      }
  })
  
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.destroy({
      where: {
        user: user.id, type: tokenTypes.VERIFY_EMAIL 
      }
  })
    await userService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};
