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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSecurePassword = exports.paginationFun = exports.ConvertToObjectIds = void 0;
const constants_1 = require("./constants");
const bcryptjs_1 = require("bcryptjs");
const ObjectId = require('mongoose').Types.ObjectId;
function ConvertToObjectIds(array) {
    const tempArray = [];
    array.map(O => tempArray.push(new ObjectId(O)));
    return tempArray;
}
exports.ConvertToObjectIds = ConvertToObjectIds;
const paginationFun = (modelnameZ, query, eliminate, popArray) => __awaiter(void 0, void 0, void 0, function* () {
    let data = {};
    let popArrayLocal = [];
    let limit = 100;
    if (popArray)
        popArrayLocal = popArray;
    const current = Number(query.page ? query.page : null);
    let skip = 0;
    if (current) {
        skip = constants_1.constants.PERPAGE * current - constants_1.constants.PERPAGE;
        limit = 10;
    }
    delete query['page'];
    console.log('query For pagination:', query);
    console.log('skip', skip);
    yield modelnameZ
        .find(query, eliminate)
        .sort('-_id')
        .populate(popArrayLocal)
        .skip(skip)
        .limit(limit)
        .then((results) => __awaiter(void 0, void 0, void 0, function* () {
        const total = yield modelnameZ.countDocuments(query);
        data = { data: results, total };
    }));
    console.log('Data is ', data);
    return data;
});
exports.paginationFun = paginationFun;
function generateSecurePassword() {
    const specialChar = ['!*', '@$', '%$', '&^', '&%', ')%', '$#', '~!'], uppers = 'QWERTYUIOPASDFGHJKLZXCVBNM', numbers = '1234567890', passKey = Math.random().toString(36).slice(-8).split('');
    passKey[Math.ceil(Math.random() * 6)] = specialChar[Math.ceil(Math.random() * 6)];
    const password = `${uppers[Math.ceil(Math.random() * 25)]}${passKey.join('')}${numbers[Math.ceil(Math.random() * 9)]}`;
    const passwordHash = bcryptjs_1.hashSync(password, 12);
    return { password, passwordHash };
}
exports.generateSecurePassword = generateSecurePassword;
//# sourceMappingURL=index.js.map