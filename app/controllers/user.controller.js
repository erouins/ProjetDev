const Usermodel = require("../models/user.model");
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, clientService, deliveryService, restaurantService } = require('../services');
const logger = require('../config/logger');

const updateOrder =  catchAsync(async (req, res) => {

    action =  req.body.action;
    orderId = req.body.orderId;
    deliveryId = req.body.deliveryId;
    content = req.body.order

    switch (action) {
      case 'accept':
        logger.info("J'accepte la commande");
        deliveryService.assignOrder(orderId, deliveryId);
        break;
      case 'restaurantAccepted':
        logger.info("Le restaurant accepte la commande");
        deliveryService.restaurantAcceptOrder(orderId);
        break;
      case 'take-from-restaurant':
        deliveryService.takeFromRestaurant(orderId);
        break;
      case 'deliver':
        deliveryService.markOrderAsDone(orderId);
        break;
      case 'paid':
        clientService.markOrderAsPaid(orderId);
        break;
      case 'update':
        userService.updateOrder(orderId, content);
        break;
      default:
        throw new ApiError(httpStatus.NOT_FOUND, 'Problem orders');
    }
    res.status(httpStatus.OK).send(action);
  })
  


module.exports = {
    updateOrder
}