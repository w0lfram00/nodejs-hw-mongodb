import { Router } from 'express';
import {
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  postContactController,
  updateContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactRouter = Router();

contactRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactRouter.get('/contacts/:id', ctrlWrapper(getContactByIdController));

contactRouter.post('/contacts', ctrlWrapper(postContactController));

contactRouter.patch('/contacts/:id', ctrlWrapper(updateContactController));

contactRouter.delete('/contacts/:id', ctrlWrapper(deleteContactController));

export default contactRouter;
