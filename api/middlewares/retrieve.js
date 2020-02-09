import User from 'models/user';

import {
  ApiResourceNotFoundError,
} from 'modules/apiError';

class Retrieve {
  static retrieveUser(object, key, keyResolve = 'user') {
    return this.retrieveModel(User, keyResolve, object, key);
  }

  static retrieveModel(model, name, object, key) {
    return async (req, res, next) => {
      let doc;

      try {
        doc = await model.findById(req[object][key]);
      } catch (err) {
        return next(new ApiResourceNotFoundError(err.message));
      }

      if (!doc) {
        return next(new ApiResourceNotFoundError(`${name} does not exist`));
      }

      // eslint-disable-next-line require-atomic-updates
      req[name] = doc;
      next();
    };
  }
}

export default Retrieve;