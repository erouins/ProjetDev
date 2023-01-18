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
}

const getClientProfil = async (userId) => {
    return Client.findOne({ user: userId });
}

const getClientById = async (userId) => {
    return Client.findById( userId);
}

const updateClientProfil = async (userId, profil) => {
    const client = await Client.findOneAndUpdate({ _id: userId }, profil, { new: true });
    return client;
}

const getClientOrders = async (clientId) => {
    return Order.find({ client: clientId}).populate(['restaurant', 'delivery' , 'articles', 'menus']).populate({
        path : 'menus',
        populate : {
          path : 'articles'
        }
      })
}

const getClientHistorical = async (clientId) => {
    return Order.find({ client: clientId, $or: [{ status: 'done' }, { status: 'rejected' }]}).populate(['restaurant', 'delivery' , 'articles', 'menus']).populate({
        path : 'menus',
        populate : {
          path : 'articles'
        }
      });}

const createClientOrder = async (order) => {
    return Order.create(order);
}

const getOrderById = async (orderId) => {
    return Order.findById(orderId).populate(["articles", "menus"]);
}

const deleteOrderById = async (orderId) => {
    logger.debug("[ ] [SERVICE]  Delete order by Id: " + orderId)
    console.log('id: ', orderId)
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }
    await order.remove();
    return order;
  }

const markOrderAsPaid = async (orderId) => {
    const order = await Order.findById(orderId);
    order.isPayed = true;
    await order.save();
    return order;
}

const deleteProfile = async (userId) => {
    const profile = await Client.findById( userId);
    try {
        profile.remove();  
    } catch (error) {
        console.log('user is not client')
    }
    return profile;
}






module.exports = {
    createClientProfil,
    getClientProfil,
    deleteOrderById,
    getClientOrders,
    getClientHistorical,
    updateClientProfil,
    createClientOrder,
    getOrderById,
    markOrderAsPaid,
    getClientById,
    deleteProfile
};