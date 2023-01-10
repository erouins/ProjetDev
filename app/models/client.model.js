const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');



const clientSchema = mongoose.Schema(
    {
        user: {
            type: Number,
            required: true,
            trim: true,
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
clientSchema.plugin(toJSON);
clientSchema.plugin(paginate);


/**
 * @typedef Client
 */
const Client = mongoose.model('Client', clientSchema);

module.exports = Client;

