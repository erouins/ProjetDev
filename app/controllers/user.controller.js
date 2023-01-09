const Usermodel = require("../models/user.model");
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, clientService, deliveryService, restaurantService } = require('../services');
const logger = require('../config/logger');




module.exports = {
    register
}