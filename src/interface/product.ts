import { Iuser } from "./user";
import { Document } from "mongoose";

export interface Iproduct extends Document {
    // _id: mongoose.Schema.Types.ObjectId,        
    product_name: string,
    product_price: number,
    product_detail: string,
    product_type: string,
    product_image: string,
    retailer: string | object | Iuser
}