
const express = require('express');
const validate = require('../middlewares/validate');
const restaurantController = require('../controllers/restaurant.controller');
const restaurantValidation = require('../validations/restaurant.validation');

const router = express.Router();


router.route('/create')
    .post(validate(restaurantValidation.createRestaurant), restaurantController.create);
router.route('/')
    .get(restaurantController.getRestaurants);


module.exports = router;
