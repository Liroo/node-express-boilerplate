import helmet from 'helmet';
import cors from 'cors';

class Security {
  static setSecurity(app) {
    app.use(cors());

    app.set(helmet());
    app.disable('x-powered-by');
  }
}

export default Security;
