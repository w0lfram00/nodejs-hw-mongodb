import { Router } from 'express';
import {
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  postContactController,
  updateContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

const contactRouter = Router();

contactRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactRouter.get(
  '/contacts/:id',
  isValidId,
  ctrlWrapper(getContactByIdController),
);

contactRouter.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(postContactController),
);

contactRouter.patch(
  '/contacts/:id',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

contactRouter.delete(
  '/contacts/:id',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default contactRouter;
