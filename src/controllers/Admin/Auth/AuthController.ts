import { verify, decode, sign } from 'jsonwebtoken';
import  {genSaltSync, compareSync, hashSync } from 'bcryptjs';
import {  AdminModel} from '../../../models/users';
import { validationError } from '../../../validators';
import { messages, constants } from '../../../utils/constants';
import { generateSecurePassword } from '../../../utils';
let userId = {};
const authenticate = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split('Bearer ')[1].trim();
        verify(token, process.env.JWTSECRET_ADMIN, function (err) {
            if (err) return res.status(401).json({ message: messages.JWT_INVALID });
            userId = decode(token);
            return next();
        });
    } else {
        res.status(401).json({ message: messages.JWT_REQUIRED });
    }
};
const signJWT = result => {
    return sign(
        {
            _id: result._id
        },
        process.env.JWTSECRET_USER,
        { expiresIn: constants.JWT_EXPIRES_IN }
    );
};
const getIdFromToken = req => {
    const token = req.headers.authorization.split('Bearer ')[1].trim();
    return decode(token);
};
const getUsers = async (req, res) => {
    const response = await AdminModel.find(req.query);
    res.status(200).json(response);
};
// const registerUser = async (req, res) => {
//     try {

//         if (validationError(req.body, 'registerUser', res)) return;
//         const { email, password } = req.body;
//         const result: any = await AdminModel.findOne({ $or: [{ email }] });
//         if (result && result.email === email) return res.status(400).json({ message: messages.USER_EMAIL_EXIST });
//         req.body.password = hashSync(password, genSaltSync(10));
//         req.body.email = email;
//         await new AdminModel(req.body).save();
//         res.status(200).json({ message: messages.REGISTERED });
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ message: messages.SOMETHING_WRONG });
//     }
// };
const login = async (req, res) => {
    try {
        if (validationError(req.body, 'login', res)) return;
        const { email, password } = req.body;
        let result: any = await AdminModel.findOne({ email }, '-createdAt  -updatedAt -__v ');
        if (result && compareSync(String(password), String(result.password))) {
            if (result.status == 0) {
                return res.status(400).json({ message: messages.Ad_DEACTIVATED });
            }
            const token = await signJWT(result);
            result = result.toObject();
            delete result['password'];
            delete result['status'];
            delete result['_id'];
            result['token'] = token;
            return res.status(200).json(result);
        }
        res.status(400).json({ message: messages.LOGIN_FALIED });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: messages.SOMETHING_WRONG });
    }
};
const getUserProfile = async (req, res) => {
    try {
        const { _id } = getIdFromToken(req);
        console.log('id', _id);
        const response = await AdminModel.findById(_id, '-status -_id -password -createdAt -updatedAt -__v');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: messages.SOMETHING_WRONG });
    }
};
export { authenticate, getUsers, signJWT, getIdFromToken, login, getUserProfile };
