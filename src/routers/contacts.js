import { Router } from 'express';
import express from 'express';

import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  changeContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { schemaContact } from '../validation/contacts.js';
import { isValidID } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(express.json());

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidID, ctrlWrapper(getContactByIdController));

router.post(
  '/register',
  validateBody(schemaContact),
  ctrlWrapper(createContactController),
);

router.delete('/:contactId', isValidID, ctrlWrapper(deleteContactController));

router.patch(
  '/:contactId',
  isValidID,
  validateBody(schemaContact),
  ctrlWrapper(changeContactController),
);

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

export default router;
