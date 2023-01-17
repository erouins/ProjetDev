const { Delivery, Order } = require('../models');
const logger = require('../config/logger');

/**
 * Create a user
 * @param {Object} profil Object containing the user profile
 * @param {Object} userId Object containing the user id
 * @returns {Promise<User>}
 */
const createDeliveryProfil = async (userId, profil) => {
    const delivery = {
        ...profil,
        user: userId,
    };
    return Delivery.create(delivery);
};

const getDeliveryProfil = async (userId) => {
    return Delivery.findOne({ _id: userId });
};

const getDeliveryProfilbyId = async (userId) => {
    return Delivery.findOne({ user: userId });
};

const updateDeliveryProfil = async (userId, profil) => {
    const delivery = await Delivery.findOneAndUpdate({ _id: userId }, profil, { new: true });
    return delivery;
}

const getDeliveryOrders = async (deliveryId) => {
    const order = Order.findOne({ delivery: deliveryId, $or: [{ status: 'accepted' }, { status: 'deliver' }] }).populate('client').populate('restaurant');
    return order;
};

const getDeliveryHistorical = async (deliveryId) => {
    return Order.find({ delivery: deliveryId, status: 'done' || 'rejected' }).populate(['restaurant', 'delivery' , 'articles', 'menus']).populate({
        path : 'menus',
        populate : {
          path : 'articles'
        }
      });}


const getPendingOrders = async () => {
    return Order.find({ status: 'restaurantAccepted', isPayed: true }).populate('client').populate('restaurant');
}

const restaurantAcceptOrder = async (orderId) => {
    const order = await Order.findById(orderId);
    order.status = 'restaurantAccepted';
    order.save();
    return;
}

const restaurantRejectOrder = async (orderId) => {
    const order = await Order.findById(orderId);
    order.status = 'rejected';
    order.save();
    return;

}

const assignOrder = async (orderId, deliveryId) => {
    const profil = await Delivery.findById(deliveryId);
    const order = await Order.findById(orderId);
    order.delivery = profil;
    order.status = 'accepted';
    order.save();
    return;
}

const takeFromRestaurant = async (orderId) => {
    const order = await Order.findById(orderId);
    order.status = 'deliver';
    order.save();
    return;
}

const markOrderAsDone = async (orderId) => {
    const order = await Order.findById(orderId);
    order.status = 'done';
    order.save();
    return;
}

const deleteProfile = async (userId) => {
    console.log("usser", userId)
    const profile = await Delivery.findById(userId);

    try {
        profile.remove();
    } catch (error) {
        console.log('user is not deliver')
    }
    return profile;
}




module.exports = {
    createDeliveryProfil,
    restaurantRejectOrder,
    getDeliveryProfil,
    getDeliveryProfilbyId,
    getDeliveryOrders,
    getDeliveryHistorical,
    getPendingOrders,
    assignOrder,
    takeFromRestaurant,
    markOrderAsDone,
    updateDeliveryProfil,
    restaurantAcceptOrder,
    deleteProfile
};