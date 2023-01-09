const { Client, Order } = require('../models');
const logger = require('../config/logger');
const mongoose = require('mongoose');

/**
 * Create a client
 * @param {Object} profil Object containing the user profil
 * @returns {Promise<Client>}
 */
const createClientProfil = async (userId, profil) => {
    const client = {
        ...profil,
        user: userId,
    };
    return Client.create(client);
};

const getClientProfil = async (userId) => {
    return Client.findOne({ client: userId });
};

const updateClientProfil = async (userId, profil) => {
    const client = await Client.findOneAndUpdate({ client: userId }, profil, { new: true });
    return client;
};

const getClientOrders = async (clientId) => {
    return Order.find({ client: clientId}).populate(['restaurant', 'delivery']);
};

const createClientOrder = async (order) => {
    return Order.create(order);
};

const getOrderById = async (orderId) => {
    return Order.findById(orderId).populate(["articles", "menus"]);
}

const updateOrder = async (orderId, content) => {
    logger.debug("[ ] [SERVICE]  Attempt to UPDATE order: " + orderId);
 
    // logger.debug("[ ] [SERVICE]  menuFields.id: " + menuFields.id)

    console.log(orderId);
    console.log(content);
    return Order.findOneAndUpdate({ _id: mongoose.Types.ObjectId(orderId) }, content);
}

// const markOrderAsPaid = async (orderId) => {
//     const order = await Order.findById(orderId);
//     order.isPayed = true;
//     await order.save();
//     return order;
// }



module.exports = {
    createClientProfil,
    getClientProfil,
    getClientOrders,
    updateClientProfil,
    createClientOrder,
    getOrderById,
    updateOrder,
    // markOrderAsPaid
};