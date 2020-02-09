/* eslint-disable indent */

import express from 'express';

import ApiAuthentication from 'middlewares/apiAuthentication';

import Retrieve from 'middlewares/retrieve';
import Permission from 'middlewares/permission';

import UserController from 'controllers/user';
import SessionController from 'controllers/session';

import checkValidation from 'middlewares/validation';
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
      Health check
    */
    this.router.route('/').get((req, res) => res.sendStatus(200));

    /*
      User
    */
    this.router.route('/user')
      // Create user
      .post([
        body('password').isLength({ min: 6 }),
        body('email').isEmail(),
      ], checkValidation, UserController.create)

      // Get user
      .get(ApiAuthentication.validJwt(), ApiAuthentication.retrieveUser, UserController.get)

      // Update user
      .put([
        body('password').optional().isLength({ min: 6 }),
      ], checkValidation, ApiAuthentication.validJwt(), ApiAuthentication.retrieveUser, UserController.update)

      // Delete user
      .delete(ApiAuthentication.validJwt(), ApiAuthentication.retrieveUser, UserController.delete);

    this.router.route('/user/:userId')
      // Get user
      .get(ApiAuthentication.validJwt(), ApiAuthentication.retrieveUser,
        Retrieve.retrieveUser('params', 'userId', 'userEnd'),
        UserController.get)

      // Update user
      .put([
          body('password').optional().isLength({ min: 6 }),
        ], checkValidation,
        ApiAuthentication.validJwt(), ApiAuthentication.retrieveUser,
        Retrieve.retrieveUser('params', 'userId', 'userEnd'),
        Permission.isUserMatchFromParam,
        UserController.update)
      // Delete user
      .delete(ApiAuthentication.validJwt(), ApiAuthentication.retrieveUser,
        Retrieve.retrieveUser('params', 'userId', 'userEnd'),
        Permission.isUserMatchFromParam,
        UserController.delete);

    this.router.route('/user/forget-password')
      // Forget password
      .post([body('email').isEmail()], checkValidation, UserController.forgetPassword);

    this.router.route('/user/reset-password')
      // Reset password
      .post([
        body('token').exists(),
        body('password').isLength({ min: 6 }),
      ], checkValidation, UserController.resetPassword);

    /*
      Session
    */
    this.router.route('/session')
      // Create session
      .post(SessionController.create);
  }
}

export default Routes;
