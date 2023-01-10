const auth = require('../middlewares/auth');
const express = require('express');
const validate = require('../middlewares/validate');
const deliveryController = require('../controllers/delivery.controller');
const deliveryValidation = require('../validations/delivery.validation');


const router = express.Router();

router.route('/create')
    .post(validate(deliveryValidation.createDeliveryProfil), deliveryController.create);

// router.route('/pending')
//     .get(deliveryController.getPendingOrders)






module.exports = router;
