const auth = require('../middlewares/auth');
const express = require('express');
const validate = require('../middlewares/validate');
const restaurantController = require('../controllers/restaurant.controller');
const restaurantValidation = require('../validations/restaurant.validation');

// AJOUTER MIDDLEWARE A TOUS !!!!!!!!!!!!!!!!!!!!!!


const router = express.Router();

// router.route('/:restaurantId/orders')
//     .get(auth(), validate(restaurantValidation.getRestaurantOrders), restaurantController.getRestaurantOrders)

router.route('/:restaurantId')
    .get(auth(), restaurantController.getRestaurantsById)

router.route('/:restaurantId/article/create')
    .post( validate(restaurantValidation.createArticle), restaurantController.createArticle)

router.route('/:restaurantId/menu/create')
    .post( validate(restaurantValidation.createMenu), restaurantController.createMenu)

router.route('/:restaurantId/menu/delete')
    .delete(restaurantController.deleteMenuById)

router.route('/:restaurantId/article/delete')
    .delete( restaurantController.deleteArticleById)

router.route('/:restaurantId/article/update')
    .put(  validate(restaurantValidation.updateArticleById), restaurantController.updateArticleById)

router.route('/:restaurantId/menu/update')
    .put( validate(restaurantValidation.updateMenuById), restaurantController.updateMenuById)




module.exports = router;
