const logger = require('../config/logger');
const User = require('../models/user.model');
const { authService, userService, tokenService, emailService, clientService, deliveryService, restaurantService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

/**********************************/
/*** Routage de la ressource Auth */

const register = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body, res);
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User not createdddd');
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
    res.status(httpStatus.OK).send({  resetPasswordToken});
  });
  
  const resetPassword = catchAsync(async (req, res) => {
    await authService.resetPassword(req.query.token, req.body.password);
    res.status(httpStatus.NO_CONTENT).send();
  });

  const sendVerificationEmail = catchAsync(async (req, res) => {
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.body.user);
    await emailService.sendVerificationEmail(req.body.user.email, verifyEmailToken);
    console.log("send verify email");
    console.log(req.body.user.email);
    console.log(verifyEmailToken);
    res.status(httpStatus.NO_CONTENT).send();
  });
  
  const verifyEmail = catchAsync(async (req, res) => {
    await authService.verifyEmail(req.query.token);
    res.status(httpStatus.NO_CONTENT).send();
  });

  const findById = catchAsync(async (req, res) => {
    const accountType = req.body.accountType
    const userId = req.body.userId
    let user;

    if (accountType == "client"){
       user = await clientService.getClientProfil(userId)
    }
    else if (accountType == "restaurant"){
       user = await restaurantService.getRestaurantProfil(userId)
    }
    else if (accountType == "delivery"){
       user = await deliveryService.getDeliveryProfilbyId(userId)
    }
    if (user != null){
      res.status(httpStatus.OK).send({'response':'true'});
    }else{
      res.status(httpStatus.NOT_FOUND).send({'response':'false'});
    }
  
  });
  

module.exports = {
    login,
    register,
    forgotPassword,
    resetPassword,
    sendVerificationEmail,
    verifyEmail,
    findById
}
