"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE = exports.PORT = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.PORT = process.env.PORT;
exports.DATABASE = {
    // host: process.env.MONGODB_HOST_2,
    host: process.env.mongodb_host_TEST,
    // name: process.env.MONGODB_DB
    name: process.env.MONGODB_DB_TEST
};
console.log('Database', exports.DATABASE);
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default.set('useCreateIndex', true);
const DB = `${exports.DATABASE.host}/${exports.DATABASE.name}`;
console.log('db', DB);
mongoose_1.default.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err)
        return console.log(err);
    console.log('Mongodb connected :)');
});
//# sourceMappingURL=dbConfig.js.map