const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { restaurantService } = require('../services');
const logger = require('../config/logger');
const { createRestaurantProfil } = require('../services/restaurant.service');

const getRestaurantOrders = catchAsync(async (req, res) => {
    const orders = await restaurantService.getRestaurantOrders(req.params.restaurantId);
    res.status(httpStatus.OK).send(orders);
});

const getRestaurantHistorical = catchAsync(async (req, res) => {
    const orders = await restaurantService.getRestaurantHistorical(req.params.restaurantId);
    res.status(httpStatus.OK).send(orders);
});

const getRestaurants = catchAsync(async (req, res) => {
    const restaurants = await restaurantService.getRestaurants();
    res.status(httpStatus.OK).send(restaurants);
});

const getRestaurantsById = catchAsync(async (req, res) => {
    const restaurant = await restaurantService.getRestaurantProfilById(req.params.restaurantId);
    if (restaurant != null){
        res.status(httpStatus.OK).send(restaurant);
    }else{
        res.status(httpStatus.NOT_FOUND).send({error: "restaurant don't exists"});
    }
    
});

const updateRestaurantProfile = catchAsync(async (req, res) => {
    const restaurantId = req.params.restaurantId
    const profil = await restaurantService.updateRestaurantProfile(restaurantId, req.body.profil);
    res.status(httpStatus.CREATED).send(profil);  
});

const createArticle = catchAsync(async (req, res) => {
    logger.debug("[ ] [CONTROLLER] Create Article...")

    const restaurantId = req.params.restaurantId;
    const userId = req.body.userId;
    const restaurant = await restaurantService.getRestaurantProfil(userId)
    logger.debug(req.body.userId);
    const articleFields = req.body.article;
    logger.debug(restaurantId);
    logger.debug(articleFields);
    const article = await restaurantService.createArticle(restaurantId, articleFields);

    restaurant.articles.push(article);
    restaurant.save();

    const restaurantProfil = restaurantService.getRestaurantProfil(userId);
    res.status(httpStatus.CREATED).send(article);

})

const create =  catchAsync(async (req, res) => {
    const restaurant = await restaurantService.createRestaurantProfil(req.body);
    res.status(httpStatus.CREATED).send(restaurant);
})

const createMenu = catchAsync(async (req, res) => {
    logger.debug("[ ] [CONTROLLER] Create Menu...")

    const restaurantId = req.params.restaurantId;
    const userId = req.body.userId;
    const restaurant = await restaurantService.getRestaurantProfil(userId)

    const menuFields = req.body.menu;
    logger.debug(restaurantId);
    logger.debug(menuFields.articles);
    const menu = await restaurantService.createMenu(restaurantId, menuFields);
    console.log(restaurant);

    restaurant.menus.push(menu);
    restaurant.save();

    res.status(httpStatus.CREATED).send(menu);

})

const deleteMenuById = catchAsync(async (req, res) => {
    const menuId = req.body.menuId;
    const userId = req.body.userId;
    logger.debug("[ ] [CONTROLLER]  Delete menu by Id: " + menuId)
    const menuDeleted = await restaurantService.deleteMenuById(menuId, userId);
  
    const restaurantProfil = restaurantService.getRestaurantProfil(userId);
    console.log(res);
    console.log(httpStatus.DELETE)
    res.status(httpStatus.OK).send(restaurantProfil);
})

const deleteOrderById =  catchAsync(async (req, res) => {
    const orderId = req.params.orderId;
    logger.debug("[ ] [CONTROLLER]  Delete menu by Id: " + orderId);
    await restaurantService.deleteOrderById(req.params.orderId);
    res.status(httpStatus.OK)
})

const deleteArticleById = catchAsync(async (req, res) => {
    const articleId = req.body.articleId;
    const userId = req.body.userId;
    logger.debug("[ ] [CONTROLLER]  Delete article by Id: " + articleId)
    const articleDeleted = await restaurantService.deleteArticleById(articleId, userId);

    const restaurantProfil = await restaurantService.getRestaurantProfil(userId);
    res.status(httpStatus.OK).send(restaurantProfil);
})

const updateArticleById = catchAsync(async (req, res) => {
    const article = req.body.article;
    const articleId = article.id;
    logger.debug("[ ] [CONTROLLER] Update Article..." + articleId)
    const restaurantId = req.params.restaurantId;
    const userId = req.body.userId;
    const updateArticle = await restaurantService.updateArticle(restaurantId, article);
    const restaurantProfil = await restaurantService.getRestaurantProfil(userId);
    logger.debug(restaurantProfil);
    res.status(httpStatus.CREATED).send(updateArticle);
})

const updateMenuById = catchAsync(async (req, res) => {
    const menu = req.body.menu;
    const menuId = menu.id;
    logger.debug("[ ] [CONTROLLER] Update Menu: " + menuId)
    const restaurantId = req.params.restaurantId;
    const userId = req.body.userId;
    const updateMenu = await restaurantService.updateMenu(restaurantId, menu);
    const restaurantProfil = await restaurantService.getRestaurantProfil(userId);
    res.status(httpStatus.CREATED).send(updateMenu);
})




module.exports = {
    getRestaurantOrders,
    getRestaurantHistorical,
    getRestaurants,
    getRestaurantsById,
    updateRestaurantProfile,
    createArticle,
    deleteMenuById,
    deleteOrderById,
    createMenu,
    deleteArticleById,
    updateArticleById,
    updateMenuById,
    create
};
