const errorCode = {
  // Server error
  'a000': 'An error occured on server side',

  // Unauthorized error
  'b000': 'Unauthorized user',
};

class ErrorReplica {
  constructor(message) {
    this.name = 'ErrorReplica';
    this.message = message;
    this.stack = new Error().stack;
  }
}
ErrorReplica.prototype = Object.create(Error.prototype);

class ApiError extends ErrorReplica {
  constructor (message) {
    super(message);

    this.name = this.constructor.name;
    this.httpCode = 500;
    this.errorCode = 'a000';

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}

class TemplateError extends ApiError {
  constructor(message) {
    super(message || 'This is a template error, please not use in any situation.');
    this.name = 'TemplateError';
    this.httpCode = 500;
    this.errorCode = 'a000';
  }
}

class ApiServerError extends ApiError {
  constructor(message) {
    super(message || errorCode['a000']);
    this.name = 'ApiServerError';
    this.httpCode = 500;
    this.errorCode = 'a000';
  }
}

class ApiBadRequestError extends ApiError {
  constructor(message) {
    super(message || errorCode['d000']);
    this.name = 'ApiBadRequestError';
    this.httpCode = 400;
    this.errorCode = 'd000';
  }
}

class ApiUnauthorizedError extends ApiError {
  constructor(message) {
    super(message || errorCode['d300']);
    this.name = 'ApiUnauthorizedError';
    this.httpCode = 403;
    this.errorCode = 'd300';
  }
}

class ApiResourceNotFoundError extends ApiError {
  constructor(message) {
    super(message || errorCode['d400']);
    this.name = 'ApiResourceNotFoundError';
    this.httpCode = 404;
    this.errorCode = 'd400';
  }
}

class ApiDuplicateError extends ApiError {
  constructor(message) {
    super(message || errorCode['d900']);
    this.name = 'ApiDuplicateError';
    this.httpCode = 409;
    this.errorCode = 'd900';
  }
}

export default ApiError;
export {
  TemplateError,

  ApiServerError,

  ApiBadRequestError,
  ApiDuplicateError,
  ApiResourceNotFoundError,
  ApiUnauthorizedError,
};
