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

const router = Router();

router.use(express.json());

router.get('/contacts', ctrlWrapper(getContactsController));

router.get(
  '/contacts/:contactId',
  isValidID,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  validateBody(schemaContact),
  ctrlWrapper(createContactController),
);

router.delete(
  '/contacts/:contactId',
  isValidID,
  ctrlWrapper(deleteContactController),
);

router.patch(
  '/contacts/:contactId',
  isValidID,
  validateBody(schemaContact),
  ctrlWrapper(changeContactController),
);

export default router;
