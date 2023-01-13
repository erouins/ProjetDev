const Joi = require('joi');
const { objectId } = require('./custom.validation');


const createClientProfil = {
  body : Joi.object().keys({
            profil: Joi.object().keys({
                lastName: Joi.string().required(),
                firstName: Joi.string().required(),
                address: Joi.string().required(),
                image: Joi.string().allow(null, ""),
                zipCode : Joi.number().required(),
                city :  Joi.string().required(),
            }),
            userId: Joi.number().required()
        })
}

const updateClientProfil = {
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
}

const getClientOrders = {
    params: Joi.object().keys({
      clientId: Joi.string().custom(objectId),
    }),
  };

const createClientOrder = {
    body : Joi.object().keys({
        order: Joi.object().keys({
            restaurant: Joi.string().custom(objectId).required(),
            client: Joi.string().custom(objectId).required(),
            menus: Joi.array().items(Joi.string().custom(objectId)),
            articles: Joi.array().items(Joi.string().custom(objectId))
        })
    })
};

const updateOrder = {
  body : Joi.object().keys({
    order: Joi.object().keys({
          menus: Joi.array().items(Joi.string().custom(objectId)),
          articles: Joi.array().items(Joi.string().custom(objectId)),
          isPayed : Joi.bool(),
  }),
  orderId : Joi.string().custom(objectId).required(),
  action : Joi.string().required()
})
};

module.exports = {
    createClientProfil,
    updateOrder,
   getClientOrders, 
   createClientOrder,
   updateClientProfil
  };
