import UserContext from 'contexts/user';
import SessionContext from 'contexts/session';

import sessionSerializer from 'serializers/user/session';
import userSerializer from 'serializers/user';

import MailSender from 'modules/mailSender';

import ObjectHelper from 'helpers/object';

class UserController {

  static async create(req, res, next) {
    let user = {
      email: req.body.email,
      password: req.body.password,
    };
    if (req.body.profile) {
      user.profile = {
        firstName: req.body.profile.firstName,
        lastName: req.body.profile.lastName,
      };
    }

    try {
      user = await UserContext.create(req.body);
      await SessionContext.createSession(user);
    } catch (err) {
      return next(err);
    }
    return res.json({
      data: [sessionSerializer({ user })],
      includes: [userSerializer(user)],
    });
  }

  static async get(req, res, next) {
    let user;

    if (req.params.userId) {
      try {
        user = req.userEnd;
      } catch (err) {
        return next(err);
      }
    } else {
      user = req.user;
    }
    return res.json({
      data: [userSerializer(user)],
      includes: [],
    });
  }

  static async update(req, res, next) {
    let user;
    let update = {
      password: req.body.password,
    };
    if (req.body.profile) {
      update.profile = {
        firstName: req.body.profile.firstName,
        lastName: req.body.profile.lastName,
      };
    }

    ObjectHelper.removeUndefined(update);

    try {
      if (req.params.userId) {
        user = req.userEnd;
      } else {
        user = req.user;
      }
      user = await UserContext.update(user, update);
    } catch (err) {
      return next(err);
    }

    return res.json({
      data: [userSerializer(user)],
      includes: [],
    });
  }

  static async delete(req, res, next) {
    try {
      let user;
      if (req.params.userId) {
        user = req.userEnd;
      } else {
        user = req.user;
      }
      await UserContext.delete(user);
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
