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
            zipCode : Joi.number().required(),
            city :  Joi.string().required(),
        }),
        userId: Joi.number().required()
    }),
};

const updateDeliveryProfil = {
    body : Joi.object().keys({
              profil: Joi.object().keys({
                  lastName: Joi.string(),
                  firstName: Joi.string(),
                  address: Joi.string(),
                  image: Joi.string().allow(null, ""),
                  zipCode : Joi.number(),
                  city :  Joi.string()
              }),
          })
  };

const updateDeliveryOrder = {
    body : Joi.object().keys({
              order: Joi.object().keys({
                    isPayed : Joi.bool(),
                    status : Joi.string(),
                    delivery :  Joi.alternatives().try(createDeliveryProfil),
              }),
              action : Joi.string().required(),
              deliveryId :Joi.string().custom(objectId).required(),
              orderId : Joi.string().custom(objectId).required(),
          })
  }
  
module.exports = {
    getDelievryOrders,
    createDeliveryProfil,
    updateDeliveryProfil,
    updateDeliveryOrder
};
