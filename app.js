const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('./middleware/auth')

const express = require('express');
dotenv.config();
require('./config/database').connect();
const User = require('./model/User')
const { Product, validate } = require('./model/Product');
const { findOneAndUpdate } = require('./model/User');

const app = express();
app.use(express.json())

app.post('/register', async (req, res) => {

    try {

        const { first_name, last_name, email, password } = req.body;

        if (!(email && password && first_name && last_name)) {
            res.status(400).send('all input in  required ');
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send('user is already exist. please login ')
        }

        const bcryptpass = await bcrypt.hash(password, 10)

        const user = await User.create(
            {
                first_name,
                last_name,
                email: email.toLowerCase(),
                password: bcryptpass,
            }
        );
        console.log(user);


        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: '1h'
            }
        )

        user.token = token;

        res.status(201).json(user);

    } catch (error) {
        console.log(error.message);
    }

})

app.post('/login', async (req, res) => {


    try {

        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send('all input is required')
        }

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: '1h'
                }
            );

            user.token = token;

            res.status(200).json(user);
        }
        res.status(400).send('access denied')



    } catch (error) {
        console.log(error.message);

    }

})


app.get('/home', auth, (req, res) => {
    res.status(200).send('this is home')
})

app.post('/addproducts', auth, async (req, res) => {

    try {
        const { product_name, product_price, product_type, product_image, porduct_detail, quantity } = req.body;
        const retailer = req.user.user_id
        const { error } = validate(req.body);
        if(error)
        {

            res.status(500).send(error.details[0].message)
        } 
        else
        {

        
        console.log(req.user.user_id);

        // if (!(product_image && product_name && product_price && product_type && porduct_detail)) {
        //     res.status(400).send('all input in  required ');
        // }

       
        const updateproduct = await Product.findOneAndUpdate({ product_name: product_name }, {
            $set:
                { product_name, product_price, product_image, product_type, porduct_detail, retailer },
            $inc: { quantity: 1 }
        }, { new: true, upsert: true }, (err, data) => {
            if (!err) {
                res.status(201).send(`now you have ${data.quantity} ${data.product_name}`)
            }
            // res.status(401).send(err.message)
        })
        res.status(201).send('Product Add Successfully')
        return updateproduct;
        }

    } catch (error) {
        console.log(error.message);
    }

});

app.get('/getproducts', auth, async (req, res) => {

    // const { product_name } = req.body,
    try {
        const products = await Product.find();
        res.status(201).send(products)
        console.log(products);

    } catch (error) {

        console.log(error.message);
    }
})


app.get('/getproductbytype', auth, async (req, res) => {
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
    } catch (error) {
        console.log(error.message);
    }
})

// app.get

module.exports = app;