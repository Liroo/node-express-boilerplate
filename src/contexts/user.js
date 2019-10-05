import User from 'models/user/user';
import {
  ApiUnauthorizedError,
  ApiBadRequestError,
  ApiDuplicateError,
  ApiResourceNotFoundError,
  ApiServerError,
} from 'modules/apiError';

import UserHelper from 'helpers/user';

class UserContext {

  static async create(givenParams) {
    // Cannot set some field on creation
    delete givenParams.companies;

    const user = new User(givenParams);

    return await this.saveUser(user);
  }
  static async update(user, givenParams) {
    // Cannot set some field on creation
    delete givenParams.companies;

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
      forgetPasswordToken: UserHelper.generateForgetPasswordToken(user),
    });

    return await this.saveUser(user);
  }

  static async resetPassword(givenParams) {
    let user;
    try {
      let decode = UserHelper.verifyForgetPasswordToken(givenParams.token);
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
