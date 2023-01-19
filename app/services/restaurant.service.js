const logger = require('../config/logger');
const { Restaurant, Article, Menu, Order } = require('../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const mongoose = require('mongoose');


/**
 * Create a user
 * @param {Object} restaurantBody
 * @returns {Promise<Restaurant>}
 */
const createRestaurantProfil = async (restaurantBody) => {
  if (await Restaurant.isEmailTaken(restaurantBody.profil.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  profil = restaurantBody.profil;
  userId = restaurantBody.userId
  const restaurant = {
    ...profil,
    user: userId,
};
  return Restaurant.create(restaurant);
};

const updateRestaurantProfile = async (userId, profil) => {
  const restaurant = await Restaurant.findOneAndUpdate({ _id: userId }, profil, { new: true });
  return restaurant;
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
  return Order.find({ restaurant: restaurantId, isPayed: true }).populate('client').populate("menus").populate("articles");
};

const getRestaurantHistorical = async (restaurantId) => {
  return Order.find({ restaurant: restaurantId,$or: [{ status: 'done' }, { status: 'rejected' }]}).populate(['restaurant', 'delivery' , 'articles', 'menus']).populate({
    path : 'menus',
    populate : {
      path : 'articles'
    }
  });}



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

const deleteMenuById = async (menuId, restaurantId) => {
  
  await Restaurant.findOneAndUpdate(
      {user: restaurantId },
      { $pull: { menus: { $in: mongoose.Types.ObjectId(menuId) } } }
  )
  logger.debug("[ ] [SERVICE]  Delete menu by Id: " + menuId)
  const menu = await getMenuById(menuId);
  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Menu not found');
  }
  await menu.remove();
  return menu;
}

const deleteArticleById = async (articleId, restaurantId) => {
  const restaurant = await getRestaurantProfil(restaurantId)
  await Restaurant.findOneAndUpdate(
      {user: restaurantId },
      { $pull: { articles: { $in: mongoose.Types.ObjectId(articleId) } } }
  )
  await Menu.updateMany(
    {restaurant: mongoose.Types.ObjectId(restaurant.id) },
    { $pull: { articles: { $in: mongoose.Types.ObjectId(articleId) } } }
  )
  logger.debug("[ ] [SERVICE]  Delete article by Id: " + articleId)
  const article = await getArticleById(articleId);
  if (!article) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Article not found');
  }
  await article.remove();
  return article;
}

const deleteOrderById = async (orderId) => {
  logger.debug("[ ] [SERVICE]  Delete article by Id: " + orderId)
  console.log('id: ', orderId)
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  await order.remove();
  return order;
}

const deleteProfile = async (userId) => {
  const profile = await Restaurant.findById( userId);
  try {
    profile.remove();
  } catch (error) {
    console.log('user is not restaurant')
  }
  return profile;
}




module.exports = {
  createRestaurantProfil,
  getRestaurantProfil,
  getRestaurantProfilById,
  getRestaurantHistorical,
  updateRestaurantProfile,
  getRestaurantOrders,
  getRestaurants,
  createArticle,
  createMenu,
  deleteMenuById,
  deleteOrderById,
  getMenuById,
  deleteArticleById,
  updateArticle,
  updateMenu,
  deleteProfile
};
