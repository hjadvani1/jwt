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
exports.profile = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, email, password } = req.body;
        const bcryptpass = yield bcrypt_1.default.hash(password, 10);
        // res.send('hello')
        const user = yield User_1.default.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: bcryptpass,
        });
        console.log(user);
        const token = jsonwebtoken_1.default.sign({ user_id: user._id, email }, process.env.TOKEN_KEY || 'mykey', {
            expiresIn: '1h'
        });
        res.json(token);
        res.status(201).json(user);
    }
    catch (error) {
        throw error;
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (user && (yield bcrypt_1.default.compare(password, user.password))) {
            const token = jsonwebtoken_1.default.sign({ user_id: user._id, email }, process.env.TOKEN_KEY || 'mykey', {
                expiresIn: '1h'
            });
            user.token = token;
            res.status(200).json(user);
        }
        res.status(400).send('access denied');
    }
    catch (error) {
        throw error;
    }
    res.send('hello');
});
exports.login = login;
const profile = (req, res) => {
    res.send('hello');
};
exports.profile = profile;
//# sourceMappingURL=user.controller.js.map