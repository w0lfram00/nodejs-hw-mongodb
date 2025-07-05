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
import { authenticate } from '../middlewares/authenticate.js';
import { checkIsOwnerOfId } from '../middlewares/checkIsOwnerOfId.js';

const contactRouter = Router();

contactRouter.use(authenticate);

contactRouter.get('/', ctrlWrapper(getAllContactsController));

contactRouter.get(
  '/:contactId',
  isValidId,
  checkIsOwnerOfId,
  ctrlWrapper(getContactByIdController),
);

contactRouter.post(
  '',
  validateBody(createContactSchema),
  ctrlWrapper(postContactController),
);

contactRouter.patch(
  '/:contactId',
  isValidId,
  checkIsOwnerOfId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

contactRouter.delete(
  '/:contactId',
  isValidId,
  checkIsOwnerOfId,
  ctrlWrapper(deleteContactController),
);

export default contactRouter;
