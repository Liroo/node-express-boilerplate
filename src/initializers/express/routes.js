import express from 'express';

import ApiAuthentication from 'middlewares/apiAuthentication';

import UserController from 'controllers/user';
import SessionController from 'controllers/session';

import checkValidation from 'middlewares/validation'
import { body } from 'express-validator';

/*
  Routes

  Formal declaration of the api router and there own validations
*/
class Routes {
  constructor() {
    this.router = express.Router();
    this._setRoutes();
  }

  getRouter() {
    return this.router;
  }

  _setRoutes() {
    /*
      User
    */
    this.router.route('/users')
      // Create user
      .post([
        body('password').isLength({ min: 6 }),
      ], checkValidation, UserController.create)
      // Get user
      .get(ApiAuthentication.validJwt(), ApiAuthentication.retrieveUser, UserController.me)
      // Update user
      .put([
        body('password').isLength({ min: 6 }),
      ], checkValidation, ApiAuthentication.validJwt(), ApiAuthentication.retrieveUser, UserController.meUpdate)
      // Delete user
      .delete(ApiAuthentication.validJwt(), ApiAuthentication.retrieveUser, UserController.meDelete);

    this.router.route('/users/forget-password')
      // Forget password
      .post([body('email').isEmail()], checkValidation, UserController.forgetPassword);

    this.router.route('/users/reset-password')
      // Reset password
      .post([
        body('token').exists(),
        body('password').isLength({ min: 6 }),
      ], checkValidation, UserController.resetPassword);

    /*
      Session
    */
    this.router.route('/sessions')
      // Create session
      .post(SessionController.create)
  }
}

export default Routes;
