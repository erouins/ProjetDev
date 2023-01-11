const auth = require('../middlewares/auth');
const express = require('express');
const validate = require('../middlewares/validate');
const restaurantController = require('../controllers/restaurant.controller');
const userController = require('../controllers/user.controller');
const restaurantValidation = require('../validations/restaurant.validation');

// AJOUTER MIDDLEWARE A TOUS !!!!!!!!!!!!!!!!!!!!!!


const router = express.Router();

// router.route('/:restaurantId/orders')
//     .get(auth(), validate(restaurantValidation.getRestaurantOrders), restaurantController.getRestaurantOrders)
router.route('/create')
    .post(auth(), validate(restaurantValidation.createRestaurant), restaurantController.create);

router.route('/')
    .get(auth(), restaurantController.getRestaurants);

router.route('/:restaurantId')
    .get(auth(), restaurantController.getRestaurantsById)

router.route('/:restaurantId/article/create')
    .post(auth(),  validate(restaurantValidation.createArticle), restaurantController.createArticle)

router.route('/:restaurantId/menu/create')
    .post(auth(),  validate(restaurantValidation.createMenu), restaurantController.createMenu)

router.route('/:restaurantId/menu/delete')
    .delete(auth(), restaurantController.deleteMenuById)

router.route('/:restaurantId/article/delete')
    .delete( auth(), restaurantController.deleteArticleById)

router.route('/:restaurantId/article/update')
    .put( auth(),  validate(restaurantValidation.updateArticleById), restaurantController.updateArticleById)

router.route('/:restaurantId/menu/update')
    .put(auth(),  validate(restaurantValidation.updateMenuById), restaurantController.updateMenuById)

router.route('/:restaurantId/update-order')
    .put(auth(),  validate(restaurantValidation.updateRestaurantOrder), userController.updateOrder)




module.exports = router;
