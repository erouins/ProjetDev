const tokenService = require('../services/token.service');
const logger = require('../config/logger');
const User = require('../models/user.model');
const authService = require('../services/auth.service');
const catchAsync = require('../utils/catchAsync');

/**********************************/
/*** Routage de la ressource Auth */

const register = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body.user);
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User not created');
    };
    const tokens = await tokenService.generateAuthTokens(user);
    let profil;

    user.profil = profil.id;
    user.save();
    res.status(httpStatus.CREATED).send({ user, tokens});
})

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    let profil;
    logger.debug(user)
  
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens, profil});
  });
  

module.exports = {
    login,
    register
}
