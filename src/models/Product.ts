import { Schema, model } from "mongoose";
import { Iproduct } from "../interface/product";
import Joi, { object } from "joi";

const productSchema = new Schema({
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
        type: Object,
        default: null,
    },
    product_detail: {
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
        type: Schema.Types.ObjectId,
        ref: 'user'
    }

})




export const Product = model<Iproduct>('Product', productSchema);

// export function validate(Product: any) {
//     const schema = {
//         product_name: Joi.string().required(),
//         product_price: Joi.string().required(),
//         product_detail: Joi.string().required(),
//         product_type: Joi.string().required()
//     }
//     return Joi.Validate(Product, schema)
// }


// const schema = Joi.object({
//     product_name: Joi.string().required(),
//     product_price: Joi.string().required(),
//     product_detail: Joi.string().required(),
//     product_type: Joi.string().required()
// })

// export const validate  = schema.validate(req.body:Request)

// exports.Product = Product;
// exports.validate = validate;