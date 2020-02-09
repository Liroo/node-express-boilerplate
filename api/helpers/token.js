import jwt from 'jsonwebtoken';

const EXPIRATION_TIME = '1y';
const FORGETPASSWORD_EXPIRATION_DATE = '1d';

class TokenHelper {
  static generateSessionToken(user) {
    const token = jwt.sign(
      { userId: user._id },
      global.env.key.jwtSecret,
      { algorithm: 'HS256', expiresIn: EXPIRATION_TIME, }
    );

    return token;
  }

  static generateForgetPasswordToken(user) {
    const token = jwt.sign(
      { userId: user._id },
      global.env.key.forgetPasswordJwtSecret,
      { algorithm: 'HS256', expiresIn: FORGETPASSWORD_EXPIRATION_DATE, }
    );

    return token;
  }

  static verifyForgetPasswordToken(token) {
    // eslint-disable-next-line no-useless-catch
    try {
      let decoded = jwt.verify(
        token,
        global.env.key.forgetPasswordJwtSecret,
        { algorithm: 'HS256' }
      );
      return decoded;
    } catch(err) {
      throw err;
    }
  }
}

export default TokenHelper;
