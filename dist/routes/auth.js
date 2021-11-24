"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_controller_1 = require("../controllers/product.controller");
const autho_1 = __importDefault(require("../middleware/autho"));
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.post('/register', user_controller_1.register);
router.post('/login', user_controller_1.login);
router.post('/profile', user_controller_1.profile);
router.post('/addproduct', autho_1.default, product_controller_1.addproduct);
router.post('/getproduct', autho_1.default, product_controller_1.getproduct);
router.post('/getproductbytype', autho_1.default, product_controller_1.getproductbytype);
exports.default = router;
//# sourceMappingURL=auth.js.map