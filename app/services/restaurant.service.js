const logger = require('../config/logger');
const { Restaurant, Article, Menu } = require('../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const mongoose = require('mongoose');

/**
 * Create a user
 * @param {Object} restaurantBody
 * @returns {Promise<Restaurant>}
 */
const createRestaurantProfil = async (restaurantBody) => {
  if (await Restaurant.isEmailTaken(restaurantBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  return Restaurant.create(restaurantBody);
};

const getMenuById = async (menuId) => {
  logger.debug("[ ] [SERVICE]  Get menu by Id: " + menuId)
  return Menu.findById(menuId);
};

const getArticleById = async (articleId) => {
  logger.debug("[ ] [SERVICE]  Get article by Id: " + articleId)
  return Article.findById(articleId);
};

const getRestaurantProfil = async (userId) => {
  return Restaurant.findOne({ user: userId })
    .populate([{
      path: "articles"
    },
    { path: "menus", populate: { path: "articles" } }
    ]);
};

const getRestaurantProfilById = async (restaurantId) => {
  return Restaurant.findById(restaurantId)
  .populate([{
    path: "articles"
  },
  { path: "menus", populate: { path: "articles" } }
  ]);
};

const updateArticle = async (restaurantId, article) => {
  return Article.findOneAndUpdate({ _id: mongoose.Types.ObjectId(article.id) }, article);
};

const updateMenu = async (restaurantId, menuFields) => {
  logger.debug("[ ] [SERVICE]  Attempt to UPDATE menu: " + menuFields.id);
  let articlesIds = menuFields.articles;

  menuFields.articles = articlesIds;
  // logger.debug("[ ] [SERVICE]  menuFields.id: " + menuFields.id)

  const menu = {
    ...menuFields,
    restaurant: restaurantId,
  };
  return Menu.findOneAndUpdate({ _id: mongoose.Types.ObjectId(menuFields.id) }, menuFields);
};

const getRestaurantOrders = async (restaurantId) => {
  return Order.find({ restaurant: restaurantId, isPayed: true }).populate('client');
};

const getRestaurants = async () => {
  return await Restaurant.find().populate("menus").populate("articles");
};


const createArticle = async (restaurantId, articleFilds) => {
  const article = {
    ...articleFilds,
    restaurant: restaurantId,
  };
  return Article.create(article);
}

const createMenu = async (restaurantId, menuFilds) => {
  const menu = {
    ...menuFilds,
    restaurant: restaurantId,
  };
  return Menu.create(menu);
}

const deleteMenuById = async (menuId) => {
  logger.debug("[ ] [SERVICE]  Delete menu by Id: " + menuId)
  const menu = await getMenuById(menuId);
  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Menu not found');
  }
  await menu.remove();
  return menu;
};

const deleteArticleById = async (articleId) => {
  logger.debug("[ ] [SERVICE]  Delete article by Id: " + articleId)
  const article = await getArticleById(articleId);
  if (!article) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Article not found');
  }
  await article.remove();
  return article;
};


module.exports = {
  createRestaurantProfil,
  getRestaurantProfil,
  getRestaurantProfilById,
  // getRestaurantOrders,
  getRestaurants,
  createArticle,
  createMenu,
  deleteMenuById,
  getMenuById,
  deleteArticleById,
  updateArticle,
  updateMenu
};
