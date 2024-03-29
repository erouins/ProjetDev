const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');



const deliverySchema = mongoose.Schema(
    {
        user: {
            type: Number,
            required: true,
            trim: true 
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        zipCode: {
            type: String,
            required: true,
            trim: true,
          },
          city: {
            type: String,
            required: true,
          },
        image: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
deliverySchema.plugin(toJSON);
deliverySchema.plugin(paginate);


/**
 * @typedef Delivery
 */
const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;

