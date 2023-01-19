const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const socket = require('../emit');


const menuSchema = mongoose.Schema(
  {
    restaurant: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Restaurant',
    },
    articles: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Article",
      required: false
    }],
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trime: true,
    },
    image: {
      type: String,
      required: false,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
menuSchema.plugin(toJSON);
menuSchema.plugin(paginate);

/**
 * @typedef Menu
 */
const Menu = mongoose.model('Menu', menuSchema);

const changeStream = Menu.watch();
changeStream.on('change', (change) => {
  console.log('Change detected restaurant:', change);
    socket.sendData("menuModified")
});

module.exports = Menu;
