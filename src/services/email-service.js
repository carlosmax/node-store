'use strict'

const config = require('../config');
const sendGrid = require('@sendgrid/mail');

exports.send = async(to, subject, body) => {
    sendGrid.setApiKey(config.sendgridKey);
    sendGrid.send({
        to: to,
        from: 'carlosmax.dev@hotmail.com',
        subject: subject,
        html: body
    });
}
