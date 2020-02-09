import {
  ApiUnauthorizedError,
} from 'modules/apiError';

class Permission {
  static isUserMatchFromParam(req, res, next) {
    if (!req.params.userId || req.user.id !== req.params.userId) {
      return next(new ApiUnauthorizedError('User not admin'));
    }
    next();
  }
}

export default Permission;