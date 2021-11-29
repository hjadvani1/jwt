import { Request, Response } from "express";
import { Product } from '../models/Product';
import multer from "multer";

const filestorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }

})

export const upload = multer({ storage: filestorage })


class product {

    constructor() {

    }
    addclass = async (req: Request, res: Response) => {
        res.send('hello')
    }

    addproduct = async (req: Request, res: Response) => {

        try {

            console.log(req.body);
            
            const retailer = req.user.user_id
            const product_image = req.file;
            const { product_name, product_price, product_type, product_detail, } = req.body;

            const updateproduct = await Product.findOneAndUpdate({ product_name: new RegExp(product_name, "i") },
                {
                    $set: {
                        product_name,
                        product_price,
                        product_type,
                        product_detail,
                        retailer,
                        product_image
                    },
                    $inc:
                    {
                        quantity: 1
                    }
                },
                {
                    new: true,
                    upsert: true,
                },
            )
            res.status(201).send('Product Add Successfully')
            return updateproduct;

        } catch (error: any) {
            console.log("=================");
            res.status(400).send(error.message);
            console.log('something is wrong', error.message);

        }
    }

    getproduct = async (req: Request, res: Response) => {

        try {
            const products = await Product.find();
            res.status(201).send(products)
            console.log(products);

        } catch (error: any) {

            console.log(error.message);
        }


    }


    addimage = async (req: Request, res: Response) => {
        try {

            const image = req.file;
            const product_name = req.body.product_name
            const addimage = await Product.findOneAndUpdate({ product_name: new RegExp(product_name, "i") }, image, { upsert: true }, (err, data) => {
                if (err) res.status(500).send(err.message)
                return res.send('image add successfully')
            })

        } catch (error: any) {
            console.log(error.message);

        }
    }

    getproductbytype = async (req: Request, res: Response) => {

        try {
            var vise: any;
            const product_type = req.body.type;
            var low_price = req.body.lp;
            var high_price = req.body.hp;
            var quantity = req.body.qty;
            var p_name = req.body.pname

            if (low_price && high_price) {

                vise = {
                    product_type: new RegExp(product_type, "i"),

                    $and: [{
                        product_price: {
                            $gte: low_price
                        }
                    },
                    {
                        product_price:
                        {
                            $lte: high_price
                        }
                    }
                    ]

                }
            }
            else if (quantity && p_name) {
                vise = {
                    product_name: new RegExp(p_name, "i"),
                    quantity: new RegExp(quantity, "i")
                }
            }
            else {
                vise = {
                    product_type: new RegExp(product_type, "i"),
                }

            }

            const query = await Product.find({ vise })
            res.send(query)
        } catch (error: any) {
            console.log(error.message);
        }
    }
}

export const product1 = new product()
