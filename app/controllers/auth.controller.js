const logger = require('../config/logger');
const User = require('../models/user.model');
const { authService, userService, tokenService, emailService, clientService, deliveryService, restaurantService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

/**********************************/
/*** Routage de la ressource Auth */

const register = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User not created');
    };
    const tokens = await tokenService.generateAuthTokens(user);

    user.save();
    res.status(httpStatus.CREATED).send({ user, tokens});
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    logger.debug(user);
  
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens});
  });

  const forgotPassword = catchAsync(async (req, res) => {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
    await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
    res.status(httpStatus.NO_CONTENT).send();
  });
  
  

module.exports = {
    login,
    register,
    forgotPassword
}
