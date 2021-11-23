const mongoose = require('mongoose');
const { schema } = require('./User');
const User = require('./User')
const Joi = require('joi')

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        default: null,
    },
    product_price: {
        type: Number,
        default: 0,
    },
    product_type: {
        type: String,
        default: null,
    },
    product_image: {
        type: String,
        default: null,
    },
    porduct_detail: {
        type: String,
        default: null,
    },
    quantity:
    {
        type: Number,
        default: 0,
    },
    retailer:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }

})

const Product = mongoose.model('product', productSchema)

function validate(Product) {
    const schema = {
        product_name: Joi.string().required(),
        product_price: Joi.number().required(),
        product_image: Joi.string().required(),
        product_type: Joi.string().required(),
        porduct_detail: Joi.string().required()
    }
    return Joi.validate(Product, schema)
}

exports.Product = Product;
exports.validate = validate;
