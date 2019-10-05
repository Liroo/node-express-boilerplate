import UserContext from 'contexts/user';
import SessionContext from 'contexts/session';

import SessionSerializer from 'serializers/users/session';
import UserSerializer from 'serializers/users/user';

import MailSender from 'modules/mailSender';

class UserController {

  static async create(req, res, next) {
    let user;
    try {
      user = await UserContext.create(req.body);
      await SessionContext.createSession(user);
    } catch (err) {
      return next(err);
    }
    return res.json({
      data: [SessionSerializer({ user })],
      includes: [UserSerializer(user)],
    });
  }

  static async me(req, res, next) {
    return res.json({
      data: [UserSerializer(req.user)],
      includes: [],
    });
  }

  static async meUpdate(req, res, next) {
    let user;
    try {
      user = await UserContext.update(req.user, req.body);
    } catch (err) {
      return next(err);
    }
    return res.json({
      data: [UserSerializer(user)],
      includes: [],
    });
  }

  static async meDelete(req, res, next) {
    try {
      await UserContext.delete(req.user);
    } catch (err) {
      return next(err);
    }
    return res.json({
      data: [],
      includes: [],
    });
  }

  static async forgetPassword(req, res, next) {
    try {
      let user = await UserContext.forgetPassword(req.body);

      await MailSender.forgetPassword(user);
    } catch(err) {
      return next(err);
    }
    return res.json({
      data: [],
      includes: [],
    });
  }

  static async resetPassword(req, res, next) {
    try {
      await UserContext.resetPassword(req.body);
    } catch (err) {
      return next(err);
    }
    return res.json({
      data: [],
      includes: [],
    });
  }
}

export default UserController;
