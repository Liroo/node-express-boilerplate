import helmet from 'helmet';
import cors from 'cors';

class Security {
  static setSecurity(app) {
    app.use(cors({
      origin: ['http://localhost:8081', 'http://localhost:8081/*', 'localhost:*/*'],
    }));

    app.set(helmet());
    app.disable('x-powered-by');
  }
}

export default Security;
