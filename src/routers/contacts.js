import { Router } from 'express';

import {
  getContactsController,
  getContactByIdController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController);
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController);

export default router;
