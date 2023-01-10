// const auth = require('../middlewares/auth');
const express = require('express');
const validate = require('../middlewares/validate');
const clientController = require('../controllers/client.controller');
const userController = require('../controllers/user.controller');
const clientValidation = require('../validations/client.validation');


//const stripe = require('stripe')('sk_test_51LEAlbLhNfISaHcD8OZv3CwsgLas8yqCN08YrZUVMREgzVN0XdjDq1cH9WC7NKlc6fexCaavX6VkZmsD9wXHU3C400eWwGJ3zL');

// Find your endpoint's secret in your Dashboard's webhook settings

// AJOUTER MIDDLEWARE A TOUS !!!!!!!!!!!!!!!!!!!!!!

const router = express.Router();

router.route('/create')
    .post(validate(clientValidation.createClientProfil), clientController.create);

router.route('/:clientId/orders')
    .get(validate(clientValidation.getClientOrders), clientController.getClientOrders);

router.route('/:clientId/create-order')
    .post(validate(clientValidation.createClientOrder), clientController.createOrder);

router.route('/:clientId/update-profil')
    .put(validate(clientValidation.updateClientProfil), clientController.updateClientProfil);

router.route('/:clientId/update-order')
    .put(validate(clientValidation.updateOrder), userController.updateOrder);

// router.route('/:clientId/create-checkout-session').post(auth(), clientController.createCheckoutSession);

// router.route('/webhook').post(express.raw({ type: 'application/json' }), clientController.checkoutSessionHandler);


module.exports = router;
