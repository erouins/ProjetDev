const mongoose = require('mongoose');
const socket = require('../emit');
const { toJSON, paginate } = require('./plugins');



const orderSchema = mongoose.Schema(
  {
    restaurant: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    client: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Client',
      required: true,
    },
    delivery: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Delivery',
      required: false,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'deliver', 'done', 'restaurantAccepted'],
      default: 'pending',
      required: false,

    },
    menus: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Menu',
      },
    ],
    articles: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Article',
      },
    ],
    isPayed: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

/**
 * @typedef Order
 */
const Order = mongoose.model('Order', orderSchema);

const changeStream = Order.watch();
changeStream.on('change', (change) => {
  console.log('Change detected restaurant:', change);
    socket.sendData("orderModified")
});


module.exports = Order;
