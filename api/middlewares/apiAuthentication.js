import jwt from 'express-jwt';
import User from 'models/user';

import {
  ApiUnauthorizedError,
  ApiResourceNotFoundError,
} from 'modules/apiError';

class ApiAuthentication {
  static validJwt() {
    const jwtValidation = jwt({
      secret: global.env.key.jwtSecret,
      requestProperty: 'jwtToken',
    });

    return jwtValidation;
  }

  static async retrieveUser(req, res, next) {
    let user;
    let jwtToken;
    try {
      user = await User.findById(req.jwtToken.userId);
      jwtToken = req.headers.authorization.split(' ')[1];
    } catch (err) {
      return next(new ApiUnauthorizedError(err.message));
    }

    if (!user) {
      return next(new ApiResourceNotFoundError('User does not exist anymore'));
    }

    let sessionFound = user.sessions.find(s => {
      return s.token === jwtToken;
    });

    if (!sessionFound) {
      return next(new ApiUnauthorizedError('Token not in use anymore'));
    }

    // eslint-disable-next-line require-atomic-updates
    req.user = user;
    next();
  }
}

export default ApiAuthentication;
