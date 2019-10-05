import nodemailer from 'nodemailer';

import Logs from 'modules/logs';

class Mailer {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: global.env.mailer.transportHost,
      port: global.env.mailer.transportPort,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: global.env.mailer.transportAuthUser,
        pass: global.env.mailer.transportAuthPass,
      },
    });
  }

  verifyConnection() {
    return new Promise((resolve, reject) => {
      Logs.log('Mailer', 'Verifying connection to SMTP...');
      this.transporter.verify(function (err) {
        if (err) {
          Logs.error('Mailer', 'Error when trying to verify the connection to SMTP');
          return reject(err);
        } else {
          Logs.success('Mailer', 'Successfuly verified connection to STMP');
          return resolve();
        }
      });
    });
  }
}

export default Mailer;