import {
  validationResult,
} from 'express-validator';

import { ApiBadRequestError } from 'modules/apiError';

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ApiBadRequestError(errors.array()));
  }
  next();
};

export default checkValidation;