import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidID = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return next(createHttpError(400, 'Invalid ID format'));
  }

  next();
};
