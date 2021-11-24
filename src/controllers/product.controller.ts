import { Request, Response } from "express";
import Product from "models/Product";

export const addproduct = async (req: Request, res: Response) => {

    try {

        const retailer = req.user.user_id
        const { product_name, product_price, product_type, product_detail, } = req.body;
        const updateproduct = await Product.findOneAndUpdate({ product_name: product_name },
            {
                $set: {
                    product_name,
                    product_price,
                    product_type,
                    product_detail,
                    retailer
                },
                $inc:
                {
                    quantity: 1
                }
            },
            {
                new: true,
                upsert: true,
            }, (err, data) => {
                if (!err) res.status(201).send(`now you have ${data} `)
            })
        res.status(201).send('Product Add Successfully')
        return updateproduct;

    } catch (error) {
        console.log('something is wrong');

    }
}

export const getproduct = async (req: Request, res: Response) => {

    try {
        const products = await Product.find();
        res.status(201).send(products)
        console.log(products);

    } catch (error: any) {

        console.log(error.message);
    }


}

export const getproductbytype = async (req: Request, res: Response) => {

    try {
        var vise;
        const product_type = req.body.type;
        var low_price = req.body.lp;
        var high_price = req.body.hp;
        var quantity = req.body.qty;
        var p_name = req.body.pname

        if (low_price && high_price) {

            vise = {
                product_type: product_type,

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
                product_name: p_name,
                quantity: quantity
            }
        }
        else {
            vise = {
                product_type: product_type,
            }

        }

        const query = await Product.find(vise)
        res.send(query)
    } catch (error: any) {
        console.log(error.message);
    }
}