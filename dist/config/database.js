"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb://localhost/testdb", {}).then(() => {
    console.log('connceted');
}).catch(err => {
    console.log(err.message);
});
mongoose_1.default.set('debug', true);
//# sourceMappingURL=database.js.map