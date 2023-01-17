const { Client, Order } = require('../models');
const logger = require('../config/logger');
const mongoose = require('mongoose');
const socket = require('../emit');
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
const createClientOrder = async (order) => {
    return Order.create(order);
}

const getOrderById = async (orderId) => {
    return Order.findById(orderId).populate(["articles", "menus"]);
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



const changeStream = Order.watch();
changeStream.on('change', (change) => {
  console.log('Change detected:', change);
    socket.sendData("orderModified")
});



module.exports = {
    createClientProfil,
    getClientProfil,
    getClientOrders,
    updateClientProfil,
    createClientOrder,
    getOrderById,
    markOrderAsPaid,
    getClientById,
    deleteProfile
};