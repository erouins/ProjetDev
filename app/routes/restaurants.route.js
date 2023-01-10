const auth = require('../middlewares/auth');
const express = require('express');
const validate = require('../middlewares/validate');
const restaurantController = require('../controllers/restaurant.controller');
const restaurantValidation = require('../validations/restaurant.validation');

const router = express.Router();


router.route('/create')
    .post(auth(), validate(restaurantValidation.createRestaurant), restaurantController.create);
router.route('/')
    .get(auth(), restaurantController.getRestaurants);


module.exports = router;
