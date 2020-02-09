import express from 'express';
import Security from 'initializers/express/security';
import bodyParser from 'body-parser';
import Routes from 'initializers/express/routes';
import HandleError from 'initializers/express/handleError';
import NotFound from 'initializers/express/404';
import {
  basicLogger,
} from 'initializers/express/winston';

import Logs from 'modules/logs';

class Express {
  constructor() {
    this.app = express();

    // json parser
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    /*
      secure http request
      We are not talking about session auth
      Just about http headers actually
    */
    this._setSecurity();

    // winston logger for each request
    if (process.env.NODE_ENV !== 'test') {
      this.app.use(basicLogger);
    }

    // create routes
    const routes = this._setRoutes();
    this.app.use('/api', routes);

    this.app.use(NotFound.sendNotFound);

    this.app.use(HandleError.handleError);
  }

  _setSecurity() {
    Security.setSecurity(this.app);
  }

  _setRoutes() {
    this.router = new Routes();
    return this.router.getRouter();
  }

  boot() {
    this.app.listen(global.env.server.port);

    Logs.success(`Server is running on port ${global.env.server.port}`);
  }
}

export default Express;
