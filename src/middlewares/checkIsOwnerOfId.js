import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/models/contacts.js';

export const checkIsOwnerOfId = async (req, res, next) => {
  console.log(String(req.user._id), req.params.contactId);

  const contact = await ContactsCollection.findOne({
    userId: req.user._id,
    _id: req.params.contactId,
  });
  console.log(contact);

  if (!contact) {
    next(createHttpError(403));
    return;
  }
  next();
};
