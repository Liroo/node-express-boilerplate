import User from 'models/user';
import {
  ApiUnauthorizedError,
  ApiBadRequestError,
  ApiDuplicateError,
  ApiResourceNotFoundError,
  ApiServerError,
} from 'modules/apiError';

import TokenHelper from 'helpers/token';

class UserContext {

  static async create(givenParams) {
    const user = new User(givenParams);

    return await this.saveUser(user);
  }

  static async update(user, givenParams) {
    Object.assign(user, givenParams);

    return await this.saveUser(user);
  }

  static async delete(user) {
    try {
      await user.remove();
    } catch (err) {
      throw new ApiServerError(err.message);
    }
  }

  static async get(id) {
    try {
      let user = await User.findById(id);

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (err) {
      throw new ApiResourceNotFoundError(err.message);
    }
  }

  static async getMany(users) {
    try {
      return await User.find({
        '_id': { $in: users }
      });
    } catch (err) {
      throw new ApiServerError(err.message);
    }
  }

  static async forgetPassword(givenParams) {
    let user;

    try {
      user = await User.findOne({ email: givenParams.email });
      if (!user) {
        throw new Error('User not found');
      }
    } catch (err) {
      throw new ApiResourceNotFoundError(err.message);
    }

    Object.assign(user, {
      forgetPasswordToken: TokenHelper.generateForgetPasswordToken(user),
    });

    return await this.saveUser(user);
  }

  static async resetPassword(givenParams) {
    let user;
    try {
      let decode = TokenHelper.verifyForgetPasswordToken(givenParams.token);
      let userId = decode.userId;
      user = await User.findById(userId);

      if (!user) {
        throw new Error('User not found');
      }
      if (user.forgetPasswordToken !== givenParams.token) {
        throw new Error('Invalid token');
      }
    } catch(err) {
      throw new ApiUnauthorizedError(err.message);
    }

    try {
      Object.assign(user, {
        forgetPasswordToken: '',
        password: givenParams.password,
      });

      return await this.saveUser(user);
    } catch (err) {
      throw new ApiServerError(err.message);
    }
  }

  static async saveUser(user) {
    try {
      await user.save();
    } catch (err) {
      if (err.code === 11000) {
        throw new ApiDuplicateError(err.message);
      } else if (err.name === 'ValidationError') {
        throw new ApiBadRequestError(err.message);
      } else {
        throw new ApiServerError(err.message);
      }
    }
    return user;
  }
}

export default UserContext;
