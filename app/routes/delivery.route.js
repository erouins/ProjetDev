const auth = require('../middlewares/auth');
const express = require('express');
const validate = require('../middlewares/validate');
const deliveryController = require('../controllers/delivery.controller');
const userController = require('../controllers/user.controller');
const deliveryValidation = require('../validations/delivery.validation');



const router = express.Router();

router.route('/create')
    .post(validate(deliveryValidation.createDeliveryProfil), deliveryController.create);

router.route('/pending')
    .get(deliveryController.getPendingOrders);

router.route('/:deliveryId/orders')
    .get(deliveryController.getDeliveryOrders);

router.route('/:deliveryId/update-profil')
    .put(validate(deliveryValidation.updateDeliveryProfil), deliveryController.updateDeliveryProfil);

router.route('/:deliveryId')
    .get(deliveryController.getDeliveryProfil);

router.route('/:deliveryId/update-order')
    .put(validate(deliveryValidation.updateDeliveryOrder), userController.updateOrder);








module.exports = router;
