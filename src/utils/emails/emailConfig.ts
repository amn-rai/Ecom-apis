import { _HTML_TEMPLATE_WELLCOME_CREDENTIALS, _HTML_TEMPLATE_SEND_FORGOT_PASSWORD } from './emailTemlates';

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

async function SendWellComeCredentialsEmail(config) {
    const loginHere = `http://www.ecom.ca/login?iam=${config.iam}`;
    config.loginHere = loginHere;
    const email = {
        from: 'no-reply@ecom.ca',
        fromname: 'ecom',
        to: config.email,
        subject: 'You have been invited to ecom',
        html: _HTML_TEMPLATE_WELLCOME_CREDENTIALS(config)
    };

    await client.sendMail(email, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
}

async function SendResetPasswordEmail(config) {
    const email = {
        from: 'no-reply@ecom.ca',
        fromname: 'ecom',
        to: config.email,
        subject: 'Reset your ecom Password.',
        html: _HTML_TEMPLATE_SEND_FORGOT_PASSWORD(config)
    };

    await client.sendMail(email, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
}
export { SendWellComeCredentialsEmail, SendResetPasswordEmail };
