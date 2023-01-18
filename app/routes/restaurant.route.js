const auth = require('../middlewares/auth');
const express = require('express');
const validate = require('../middlewares/validate');
const restaurantController = require('../controllers/restaurant.controller');
const userController = require('../controllers/user.controller');
const restaurantValidation = require('../validations/restaurant.validation');




const router = express.Router();

router.route('/create')
    .post(auth('restaurant'), validate(restaurantValidation.createRestaurant), restaurantController.create);

router.route('/')
    .get(auth(), restaurantController.getRestaurants);



router.route('/:restaurantId')
    .get(auth(), restaurantController.getRestaurantsById)

router.route('/:restaurantId/orders')
    .get(auth('restaurant'), restaurantController.getRestaurantOrders)

router.route('/:restaurantId/historical')
    .get(auth('restaurant'), restaurantController.getRestaurantHistorical)

router.route('/:restaurantId/update')
    .post(auth('restaurant'), validate(restaurantValidation.updateProfile), restaurantController.updateRestaurantProfile)

router.route('/:restaurantId/article/create')
    .post(auth('restaurant'), validate(restaurantValidation.createArticle), restaurantController.createArticle)

router.route('/:restaurantId/menu/create')
    .post(auth('restaurant'), validate(restaurantValidation.createMenu), restaurantController.createMenu)

router.route('/:restaurantId/menu/delete')
    .delete(auth('restaurant'), restaurantController.deleteMenuById)

router.route('/:orderId/order/delete')
    .delete(auth(), restaurantController.deleteOrderById);

router.route('/:restaurantId/article/delete')
    .delete(auth('restaurant'), restaurantController.deleteArticleById)

router.route('/:restaurantId/article/update')
    .put(auth('restaurant'), validate(restaurantValidation.updateArticleById), restaurantController.updateArticleById)

router.route('/:restaurantId/menu/update')
    .put(auth('restaurant'), validate(restaurantValidation.updateMenuById), restaurantController.updateMenuById)

router.route('/:restaurantId/update-order')
    .put(auth('restaurant'), validate(restaurantValidation.updateRestaurantOrder), userController.updateOrder)




module.exports = router;
