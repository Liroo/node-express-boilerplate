import 'initializers/global';

/*
  initializers:
    - prettyError: used to render custom pretty error
    - mongoose: create connection with db and load schemas
    - express: create express server, set routes and run server
    - mailer: create mailer connection, define mail templating
*/
import pe from 'initializers/prettyError';
import Mongoose from 'initializers/mongoose';
import Express from 'initializers/express';
import Mailer from 'initializers/mailer';

import User from 'models/user';

class Application {
  constructor() {
    this.pe = pe;

    this.mongoose = new Mongoose(global.env.mongo.uri, global.env.mongo.db);
    this.mailer = new Mailer();
    this.express = new Express();
  }

  async boot() {
    try {
      // Make connection with db
      await this.mongoose.createConnection();
      global.env.meta.superAdmin = (await User.countDocuments() > 0);

      // Make connection with SMTP mailer
      await this.mailer.verifyConnection();
    } catch (err) {
      return console.error(pe.render(err));
    }


    // Run the cron schedule
    // boot server
    if (!global.env.__TEST__) {
      this.express.boot();
    }
  }
}

global.app = new Application();

export default global.app;
