"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
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
    quantity: {
        type: Number,
        default: 0,
    },
    retailer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    }
});
exports.default = (0, mongoose_1.model)('Product', productSchema);
//# sourceMappingURL=Product.js.map