import { Iuser } from "./user";
import { Document } from "mongoose";

export interface Iproduct extends Document {
    product_name: string,
    product_price: number,
    product_detail: string,
    product_type: string,
    product_image: Buffer,
    retailer: string | object | Iuser
}