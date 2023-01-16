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
      case 'restaurantRejected':
        logger.info("Le restaurant accepte la commande");
        deliveryService.restaurantRejectOrder(orderId);
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
  });


  const findById =  catchAsync(async (req, res) => {
    const users = await userService.getUserById(req.params.userId);
    res.status(httpStatus.OK).send(users);

  });

  const deleteUser =  catchAsync(async (req, res) => {

    let user = await clientService.deleteProfile(req.params.userId)
    if (user != null){
      userService.deleteUserById(user.user)
      res.status(httpStatus.OK).send(user);      
    }else{
       user = await restaurantService.deleteProfile(req.params.userId)
      if (user != null){
        userService.deleteUserById(user.user)
        res.status(httpStatus.OK).send(user);    
      }else{
         user = await deliveryService.deleteProfile(req.params.userId)
         userService.deleteUserById(user.user)
         res.status(httpStatus.OK).send(user); 
      }
    }

   

  });
  


module.exports = {
    updateOrder,
    findById,
    deleteUser
}