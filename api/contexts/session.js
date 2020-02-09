import {
  ApiServerError,
  ApiBadRequestError,
  ApiUnauthorizedError,
} from 'modules/apiError';

import User from 'models/user';
import TokenHelper from 'helpers/token';

class SessionContext {
  static async create(givenParams) {
    let user;

    try {
      user = await User.findOne({ email: givenParams.email });
      if (!user) {
        throw new Error('User not found');
      }
      if (!await user.comparePassword(givenParams.password)) {
        throw new ApiUnauthorizedError();
      }
    } catch (err) {
      throw new ApiUnauthorizedError(err.message);
    }
    return this.createSession(user);
  }

  static async createSession(user) {
    const session = {
      token: TokenHelper.generateSessionToken(user),
    };

    if (user.sessions instanceof Array) {
      user.sessions.push(session);
    } else {
      user.sessions = [session];
    }

    try {
      await user.save();
    } catch (err) {
      if (err.name === 'ValidationError') {
        throw new ApiBadRequestError(err.message);
      } else {
        throw new ApiServerError(err.message);
      }
    }
    return user;
  }
}

export default SessionContext;
