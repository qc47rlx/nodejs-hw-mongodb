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
import { schemaContact, schemaContactPatch } from '../validation/contacts.js';
import { isValidID } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = Router();

router.use(express.json());

router.get('/contacts', ctrlWrapper(getContactsController));

router.get(
  '/:contactId',
  checkRoles(ROLES.AUTOR),
  isValidID,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete(
  '/contacts/:contactId',
  isValidID,
  ctrlWrapper(deleteContactController),
);

router.delete(
  '/:contactId',
  isValidID,
  validateBody(schemaContactPatch),
  ctrlWrapper(changeContactController),
);

export default router;
