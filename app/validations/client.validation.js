const Joi = require('joi');
const { objectId } = require('./custom.validation');



const createClientProfil = {
  body : Joi.object().keys({
            profil: Joi.object().keys({
                name: Joi.string().required(),
                firstName: Joi.string().required(),
                address: Joi.string().required(),
                image: Joi.string().allow(null, ""),
            }),
            userId: Joi.string().custom(objectId),
        })
}

// const getClientOrders = {
//   params: Joi.object().keys({
//     clientId: Joi.string().custom(objectId),
//   }),
// };

// const createClientOrder = {
//     body : Joi.object().keys({
//         order: Joi.object().keys({
//             restaurant: Joi.string().custom(objectId),
//             client: Joi.string().custom(objectId),
//             menus: Joi.array().items(Joi.string().custom(objectId)),
//             articles: Joi.array().items(Joi.string().custom(objectId))
//         })
//     })
// };

module.exports = {
  createClientProfil
  //  getClientOrders, 
  //  createClientOrder 
  };
