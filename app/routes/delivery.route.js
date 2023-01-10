const auth = require('../middlewares/auth');
const express = require('express');
const validate = require('../middlewares/validate');
const deliveryController = require('../controllers/delivery.controller');
const userController = require('../controllers/user.controller');
const deliveryValidation = require('../validations/delivery.validation');



const router = express.Router();

router.route('/create')
    .post(auth(), validate(deliveryValidation.createDeliveryProfil), deliveryController.create);

router.route('/pending')
    .get(auth(), deliveryController.getPendingOrders);

router.route('/:deliveryId/orders')
    .get(auth(), deliveryController.getDeliveryOrders);

router.route('/:deliveryId/update-profil')
    .put(auth(), validate(deliveryValidation.updateDeliveryProfil), deliveryController.updateDeliveryProfil);

router.route('/:deliveryId')
    .get(auth(), deliveryController.getDeliveryProfil);

router.route('/:deliveryId/update-order')
    .put(auth(), validate(deliveryValidation.updateDeliveryOrder), userController.updateOrder);








module.exports = router;
