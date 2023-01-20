const auth = require('../middlewares/auth');
const express = require('express');
const validate = require('../middlewares/validate');
const deliveryController = require('../controllers/delivery.controller');
const userController = require('../controllers/user.controller');
const deliveryValidation = require('../validations/delivery.validation');



const router = express.Router();
/**
 * @swagger
 * /users:
 *   get:
 *     description: Returns a list of users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 *
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 */
router.route('/create')
    .post(auth('deliverer'), validate(deliveryValidation.createDeliveryProfil), deliveryController.create);

router.route('/pending')
    .get(auth('deliverer'), deliveryController.getPendingOrders);

router.route('/:deliveryId/historical')
    .get(auth('deliverer'), deliveryController.getDeliveryHistorical);

router.route('/:deliveryId/orders')
    .get(auth('deliverer'), deliveryController.getDeliveryOrders);

router.route('/:deliveryId/update-profil')
    .put(auth(), validate(deliveryValidation.updateDeliveryProfil), deliveryController.updateDeliveryProfil);

router.route('/:deliveryId')
    .get(auth('deliverer'), deliveryController.getDeliveryProfil);

router.route('/:deliveryId/update-order')
    .put(auth('deliverer'), validate(deliveryValidation.updateDeliveryOrder), userController.updateOrder);








module.exports = router;
