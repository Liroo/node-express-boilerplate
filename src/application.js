
/*
  Do not import dotenv only
  import dotenv/config and not using dotenv.config()
  because in es6, import is processing before reading file
  https://hacks.mozilla.org/2015/08/es6-in-depth-modules/
*/
import 'dotenv/config';
/*
  Important to import global config just after dotenv/config
*/
import 'initializers/global';

/*
  initializers:
    - prettyError: used to render custom pretty error
    - mongoose: create connection with db and load schemas
    - express: create express server, set routes and run server
*/
import pe from 'initializers/prettyError';
import Mongoose from 'initializers/mongoose';
import Express from 'initializers/express';
import Mailer from 'initializers/mailer';

import nodemailer from 'nodemailer';

class Application {
  constructor() {
    this.pe = pe;

    this.mongoose = new Mongoose(global.env.mongo.uri, global.env.mongo.db);
    this.express = new Express();
  }

  async boot() {
    // Make connection with db
    // Make connection with SMTP mailer
    try {
      await this.mongoose.createConnection();

      if (!global.env.mailer.transportHost) {
        const testAccount = await nodemailer.createTestAccount();

        global.env.mailer = {
          transportHost: 'smtp.ethereal.email',
          transportPort: 587,
          transportAuthUser: testAccount.user,
          transportAuthPass: testAccount.pass,
        };
      }
      this.mailer = new Mailer();
      await this.mailer.verifyConnection();
    } catch (err) {
      return console.error(pe.render(err));
    }

    // boot server
    this.express.boot();
  }
}

global.app = new Application();

export default global.app;
