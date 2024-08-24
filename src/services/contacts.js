import ContactsCollection from '../db/models/contact.js';
import { SORT_ORDER } from '../constants/index.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter,
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  let contactsQuery = ContactsCollection.find();

  if (filter.isFavourite) {
    contactsQuery = contactsQuery
      .where('isFavourite')
      .equals(filter.isFavourite);
  }

  if (filter.contactType) {
    contactsQuery = contactsQuery
      .where('contactType')
      .equals(filter.contactType);
  }

  contactsQuery.where('userId').equals(userId);

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  // Вычисляем данные для пагинации
  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  // Возвращаем данные и информацию о пагинации
  return {
    data: contacts,
    ...paginationData,
  };
};

function getContactById(contactId, userId) {
  return ContactsCollection.findById({ _id: contactId, userId });
}

// new - - -

function createContact(contact) {
  return ContactsCollection.create(contact);
}

function deleteContact(contactId, userId) {
  return ContactsCollection.findByIdAndDelete({ _id: contactId, userId });
}

const patchContact = async (contactId, userId, payload, options) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;
  console.log(rawResult._id);
  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  patchContact,
};
