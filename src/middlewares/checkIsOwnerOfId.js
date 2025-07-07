import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/models/contacts.js';

export const checkIsOwnerOfId = async (req, res, next) => {
  const contact = await ContactsCollection.findOne({
    userId: req.user._id,
    _id: req.params.contactId,
  });

  if (!contact) {
    next(createHttpError(403));
    return;
  }
  next();
};
