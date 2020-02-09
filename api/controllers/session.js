import SessionContext from 'contexts/session';

import sessionSerializer from 'serializers/user/session';
import userSerializer from 'serializers/user';

class SessionController {

  static async create(req, res, next) {
    let user;
    try {
      user = await SessionContext.create(req.body);
    } catch (err) {
      return next(err);
    }
    return res.json({
      data: [sessionSerializer({ user })],
      includes: [userSerializer(user)],
    });
  }
}

export default SessionController;
