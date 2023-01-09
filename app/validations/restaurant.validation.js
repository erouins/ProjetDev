const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const getRestaurantOrders = {
    params: Joi.object().keys({
        restaurantId: Joi.string().custom(objectId),
    }),
};

const createArticle = {
    body: Joi.object().keys({
        article: Joi.object().keys({
            name: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.string().required(),
            price: Joi.number().required(),
        }),
        userId: Joi.string().custom(objectId),
    })
}

const createMenu = {
    body: Joi.object().keys({
        menu: Joi.object().keys({
            articles: Joi.array().required(),
            name: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.string().required(),
            price: Joi.number().required(),
        }),
        userId: Joi.string().custom(objectId).required(),
    })
}

const updateArticleById = {
    body: Joi.object().keys({
        article: Joi.object().keys({
            id: Joi.string().custom(objectId).required(),
            name: Joi.string(),
            description: Joi.string(),
            image: Joi.string(),
            price: Joi.number(),
        }),
    })
}

const updateMenuById = {
    body: Joi.object().keys({
        menu: Joi.object().keys({
            id: Joi.string().custom(objectId).required(),
            articles: Joi.array(),
            name: Joi.string(),
            description: Joi.string(),
            image: Joi.string(),
            price: Joi.number(),
        }),
        userId: Joi.string().custom(objectId),
    })
}

const createRestaurant = {
    body: Joi.object().keys({
        user: Joi.string().custom(objectId),
        address: Joi.string().required(),
        city: Joi.string().required(),
        zipCode: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().allow(null, ""),
      })
}



module.exports = {
    getRestaurantOrders,
    createArticle,
    updateMenuById,
    updateArticleById,
    createMenu,
    createRestaurant
};
