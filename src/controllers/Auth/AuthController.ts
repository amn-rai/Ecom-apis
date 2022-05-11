import { verify, decode, sign } from 'jsonwebtoken';
import bcrypt, { compareSync, hashSync } from 'bcryptjs';
import { usersModel } from '../../models/users';
import { validationError } from '../../validators';
import { messages, constants } from '../../utils/constants';
import { generateSecurePassword } from '../../utils';
let userId = {};
const authenticate = function (req, res, next) {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split('Bearer ')[1].trim();
        verify(token, process.env.JWTSECRET_User, function (err) {
            if (err) return res.status(401).json({ message: messages.JWT_INVALID });
            userId = decode(token);
            return next();
        });
    } else {
        res.status(401).json({ message: messages.JWT_REQUIRED });
    }
};
const signJWT = function (result) {
    return sign(
        {
            id: result._id
        },
        process.env.JWTSECRET_USER,
        { expiresIn: constants.JWT_EXPIRES_IN }
    );
};
const getIdFromToken = req => {
    const token = req.headers.authorization.split('Bearer ')[1].trim();
    return decode(token);
};
console.log(generateSecurePassword());

const getUsers = async (req, res) => {
    const response = await usersModel.find(req.query);
    res.status(200).json(response);
};
const registerUser = async (req, res) => {
    try {
        if (!req.body.role || (req.body.role <= 0 && req.body.role > 3)) {
            return res.status(400).json({ message: messages.INVALID_ROLE });
        }
        /*
        0 - RT Admin
        1 - Company Admin
        2 - Accountant
        3 - Vendor
        */
        const role = {
            1: 'registerCompanyAdmin',
            2: 'registerAccountant',
            3: 'registerVendor'
        };

        if (validationError(req.body, role[req.body.role], res)) return;
        let { email, username } = req.body;
        email = email.toLowerCase().trim();
        username = username.toLowerCase().trim();
        const result: any = await usersModel.findOne({ $or: [{ email }, { username }] });
        if (result && result.email === email) return res.status(400).json({ message: messages.USER_EMAIL_EXIST });
        if (result && result.username === username) return res.status(400).json({ message: messages.USER_NAME_EXIST });
        req.body.password = await hashSync(req.body.password, 12);
        req.body.email = email;
        req.body.username = username;
        await new usersModel(req.body).save();
        res.status(200).json({ message: messages.REGISTERED });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: messages.SOMETHING_WRONG });
    }
};
async function login(req, res) {
    if (validationError(req.body, 'login', res)) return;
    const { email, password } = req.body;
    let result: any = await usersModel.findOne({ email });
    if (result && compareSync(String(password), String(result.password))) {
        if (result.status == 0) {
            return res.status(400).json({ message: 'messages.Ad_DEACTIVATED' });
        }
        const token = await signJWT(result);
        result = result.toObject();
        delete result['password'];
        result['token'] = token;
        return res.status(200).json(result);
    }
    res.status(400).json({ message: messages.LOGIN_FALIED });
}
export { authenticate, registerUser, getUsers, signJWT, getIdFromToken, login };
