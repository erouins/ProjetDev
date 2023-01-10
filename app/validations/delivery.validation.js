const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const getDelievryOrders = {
    params: Joi.object().keys({
        deliveryId: Joi.string().custom(objectId),
    }),
};

const createDeliveryProfil = {
    body: Joi.object().keys({
        profil: Joi.object().keys({
            lastName: Joi.string().required(),
            firstName: Joi.string().required(),
            address: Joi.string().required(),
            image: Joi.string().allow(null, ""),
        }),
        userId: Joi.number().required()
    }),
};
module.exports = {
    getDelievryOrders,
    createDeliveryProfil
};
