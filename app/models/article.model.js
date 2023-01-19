const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const socket = require('../emit');


const articleSchema = mongoose.Schema(
    {
        restaurant: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Restaurant",
        },
        menu: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Menu",
            required: false
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: false,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            trim: true
        }
    }
);



// add plugin that converts mongoose to json
articleSchema.plugin(toJSON);
articleSchema.plugin(paginate);

/**
 * @typedef Article
 */
const Article = mongoose.model('Article', articleSchema);

const changeStream = Article.watch();
changeStream.on('change', (change) => {
  console.log('Change detected article:', change);
    socket.sendData("articleModified")
});

module.exports = Article;

