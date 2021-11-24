"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getproductbytype = exports.getproduct = exports.addproduct = void 0;
const Product_1 = __importDefault(require("models/Product"));
const addproduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retailer = req.user.user_id;
        const { product_name, product_price, product_type, product_detail, } = req.body;
        const updateproduct = yield Product_1.default.findOneAndUpdate({ product_name: product_name }, {
            $set: {
                product_name,
                product_price,
                product_type,
                product_detail,
                retailer
            },
            $inc: {
                quantity: 1
            }
        }, {
            new: true,
            upsert: true,
        }, (err, data) => {
            if (!err)
                res.status(201).send(`now you have ${data} `);
        });
        res.status(201).send('Product Add Successfully');
        return updateproduct;
    }
    catch (error) {
        console.log('something is wrong');
    }
});
exports.addproduct = addproduct;
const getproduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.find();
        res.status(201).send(products);
        console.log(products);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.getproduct = getproduct;
const getproductbytype = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var vise;
        const product_type = req.body.type;
        var low_price = req.body.lp;
        var high_price = req.body.hp;
        var quantity = req.body.qty;
        var p_name = req.body.pname;
        if (low_price && high_price) {
            vise = {
                product_type: product_type,
                $and: [{
                        product_price: {
                            $gte: low_price
                        }
                    },
                    {
                        product_price: {
                            $lte: high_price
                        }
                    }
                ]
            };
        }
        else if (quantity && p_name) {
            vise = {
                product_name: p_name,
                quantity: quantity
            };
        }
        else {
            vise = {
                product_type: product_type,
            };
        }
        const query = yield Product_1.default.find(vise);
        res.send(query);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.getproductbytype = getproductbytype;
//# sourceMappingURL=product.controller.js.map