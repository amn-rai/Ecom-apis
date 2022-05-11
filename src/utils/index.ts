import { constants } from './constants';
import { hashSync } from 'bcryptjs';
const ObjectId = require('mongoose').Types.ObjectId;

function ConvertToObjectIds(array: Array<any>) {
    const tempArray: any = [];
    array.map(O => tempArray.push(new ObjectId(O)));
    return tempArray;
}
const paginationFun = async (modelnameZ, query, eliminate, popArray) => {
    let data = {};
    let popArrayLocal = [];
    let limit = 100;
    if (popArray) popArrayLocal = popArray;
    const current = Number(query.page ? query.page : null);
    let skip = 0;
    if (current) {
        skip = constants.PERPAGE * current - constants.PERPAGE;
        limit = 10;
    }
    delete query['page'];
    console.log('query For pagination:', query);
    console.log('skip', skip);

    await modelnameZ
        .find(query, eliminate)
        .sort('-_id')
        .populate(popArrayLocal)
        .skip(skip)
        .limit(limit)
        .then(async results => {
            const total = await modelnameZ.countDocuments(query);
            data = { data: results, total };
        });
    console.log('Data is ', data);

    return data;
};

function generateSecurePassword() {
    const specialChar = ['!*', '@$', '%$', '&^', '&%', ')%', '$#', '~!'],
        uppers = 'QWERTYUIOPASDFGHJKLZXCVBNM',
        numbers = '1234567890',
        passKey = Math.random().toString(36).slice(-8).split('');
    passKey[Math.ceil(Math.random() * 6)] = specialChar[Math.ceil(Math.random() * 6)];
    const password = `${uppers[Math.ceil(Math.random() * 25)]}${passKey.join('')}${numbers[Math.ceil(Math.random() * 9)]}`;
    const passwordHash = hashSync(password, 12);
    return { password, passwordHash };
}
export { ConvertToObjectIds, paginationFun, generateSecurePassword };
