import SessionContext from 'contexts/session';

import SessionSerializer from 'serializers/users/session';
import UserSerializer from 'serializers/users/user';

class SessionController {

  static async create(req, res, next) {
    let user;
    try {
      user = await SessionContext.create(req.body);
    } catch (err) {
      return next(err);
    }
    return res.json({
      data: [SessionSerializer({ user })],
      includes: [UserSerializer(user)],
    });
  }
}

export default SessionController
