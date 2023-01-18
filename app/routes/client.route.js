const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const clientController = require('../controllers/client.controller');
const userController = require('../controllers/user.controller');
const clientValidation = require('../validations/client.validation');






const router = express.Router();

router.route('/create')
    .post(auth('client'), validate(clientValidation.createClientProfil), clientController.create);

router.route('/:clientId')
    .get(auth('client'), clientController.getClientProfil);

router.route('/:clientId/historical')
    .get(auth('client'), validate(clientValidation.getClientOrders), clientController.getClientHistorical);

router.route('/:clientId/orders')
    .get(auth('client'), validate(clientValidation.getClientOrders), clientController.getClientOrders);

router.route('/:clientId/create-order')
    .post(auth('client'), validate(clientValidation.createClientOrder), clientController.createOrder);

router.route('/:clientId/update-profil')
    .put(auth('client'), validate(clientValidation.updateClientProfil), clientController.updateClientProfil);

router.route('/:clientId/update-order')
    .put(auth('client'), validate(clientValidation.updateOrder), userController.updateOrder);

router.route('/:orderId/order/delete')
    .delete(auth(), clientController.deleteOrderById);

router.route('/:clientId/create-checkout-session').post(auth(), clientController.createCheckoutSession);

router.route('/payOrder').post(express.raw({ type: 'application/json' }), clientController.clientPayOrder);


module.exports = router;
