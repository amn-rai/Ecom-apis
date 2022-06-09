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
exports.SendResetPasswordEmail = exports.SendWellComeCredentialsEmail = void 0;
const emailTemlates_1 = require("./emailTemlates");
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const sgTransport = require('nodemailer-sendgrid-transport');
const { Parser } = require('json2csv');
const options = {
    auth: {
        api_key: ''
    }
};
const client = nodemailer.createTransport(sgTransport(options));
function SendWellComeCredentialsEmail(config) {
    return __awaiter(this, void 0, void 0, function* () {
        const loginHere = `http://www.ecom.ca/login?iam=${config.iam}`;
        config.loginHere = loginHere;
        const email = {
            from: 'no-reply@ecom.ca',
            fromname: 'ecom',
            to: config.email,
            subject: 'You have been invited to ecom',
            html: emailTemlates_1._HTML_TEMPLATE_WELLCOME_CREDENTIALS(config)
        };
        yield client.sendMail(email, function (err, info) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Message sent: ' + info.response);
            }
        });
    });
}
exports.SendWellComeCredentialsEmail = SendWellComeCredentialsEmail;
function SendResetPasswordEmail(config) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = {
            from: 'no-reply@ecom.ca',
            fromname: 'ecom',
            to: config.email,
            subject: 'Reset your ecom Password.',
            html: emailTemlates_1._HTML_TEMPLATE_SEND_FORGOT_PASSWORD(config)
        };
        yield client.sendMail(email, function (err, info) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Message sent: ' + info.response);
            }
        });
    });
}
exports.SendResetPasswordEmail = SendResetPasswordEmail;
//# sourceMappingURL=emailConfig.js.map