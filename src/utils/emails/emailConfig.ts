import {
    _HTML_TEMPLATE_WELLCOME_CREDENTIALS,
    _HTML_TEMPLATE_SEND_CAMPAIGN_DETAILS,
    _HTML_TEMPLATE_CONTACT_US,
    _HTML_TEMPLATE_DEMO_CULTURALY,
    _HTML_TEMPLATE_SEND_INVOICE,
    _HTML_TEMPLATE_SEND_FORGOT_PASSWORD
} from './emailTemlates';

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const sgTransport = require('nodemailer-sendgrid-transport');
const { Parser } = require('json2csv');

const options = {
    auth: {
        // api_key: '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'
        api_key: ''
    }
};

const client = nodemailer.createTransport(sgTransport(options));

async function SendWellComeCredentialsEmail(config) {
    const loginHere = `http://www.rtnest.ca/login?iam=${config.iam}`;
    config.loginHere = loginHere;
    const email = {
        from: 'no-reply@rtnest.ca',
        fromname: 'RTNEST',
        to: config.email,
        subject: 'You have been invited to RTNEST',
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
async function SendConatctUsRecievedEmail(config) {
    const email = {
        from: 'no-reply@rtnest.ca',
        fromname: 'RTNEST',
        to: config.email,
        subject: 'Your request is recieved.',
        html: _HTML_TEMPLATE_CONTACT_US()
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
        from: 'no-reply@rtnest.ca',
        fromname: 'RTNEST',
        to: config.email,
        subject: 'Reset your RTNEST Password.',
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
function jsonToCsv(myData) {
    try {
        const parser = new Parser({ includeEmptyRows: true });
        const csv = parser.parse(myData);
        return csv;
    } catch (err) {
        console.error(err);
    }
}
export {
    SendWellComeCredentialsEmail,
    SendConatctUsRecievedEmail,
    SendResetPasswordEmail
};
