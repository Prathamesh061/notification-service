const nodemailer = require('nodemailer');
const config = require('../config/config');
const { ENVIRONMENT } = require('../utils/constants');

exports.sendHighPriorityEmails = async (users, notification) => {
    const transporter = nodemailer.createTransport({
        port: config.smtpPort,
        host: config.smtpHost,
        secure: config.environment == ENVIRONMENT.PROD,
        auth: {
            user: config.emailUser,
            pass: config.emailPass
        }
    });
    for (const userToNotify of users) {
        await transporter.sendMail({
            from: config.emailUser,
            to: userToNotify.email,
            subject: 'High Priority Notification',
            html: `<div style='font-family:sans-serif;background:#f9fafb;padding:32px;border-radius:8px;'>
          <h2 style='color:#e74c3c;'>High Priority Notification</h2>
          <p style='font-size:16px;color:#333;'>
            <strong>Message:</strong> ${notification.message}<br>
            <strong>Sent by:</strong> ${notification.senderName}
          </p>
          <hr style='margin:24px 0;'>
          <small style='color:#888;'>${new Date(notification.createdAt).toLocaleString()}</small>
        </div>`
        });
    }
};
