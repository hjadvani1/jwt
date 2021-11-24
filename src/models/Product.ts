import { Schema, model } from "mongoose";
import { Iproduct } from "../interface/product";

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
        type: Buffer,
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
export default model<Iproduct>('Product', productSchema);