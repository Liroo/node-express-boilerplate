import ApiError from 'modules/apiError';
import pe from 'initializers/prettyError';

class HandleError {
  static handleError(err, req, res, next) {
    let errorCode = '500';

    if (global.env.__DEV__) {
      console.error(pe.render(err));
    }

    // default
    res.status(500);

    if (err instanceof ApiError) {
      errorCode = err.errorCode;
      res.status(err.httpCode);
    }
    // Strict mode throw from mongoose
    if (err.name === 'StrictModeError') {
      errorCode = 'd000';
      res.status(400);
    }
    // 403 from auth jwt
    if (err.name === 'UnauthorizedError') {
      errorCode = 'd300';
      res.status(403);
    }
    if (global.env.__DEV__) {
      return res.json({
        error: errorCode,
        message: err.message,
      });
    } else {
      return res.json({
        error: err.errorCode,
      });
    }
  }
}

export default HandleError;
