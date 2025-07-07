import { SORT_ORDER } from '../constants/index.js';
import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  userId,
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const skip = (page - 1) * perPage;

  console.log(userId);

  const contactsQuery = ContactsCollection.find({ userId });

  if (filter.isFavourite)
    contactsQuery.where('isFavourite').equals(filter.isFavourite);

  if (filter.contactType)
    contactsQuery.where('contactType').equals(filter.contactType);

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (id) => {
  const contact = await ContactsCollection.findById(id);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (id, payload, options) => {
  const result = await ContactsCollection.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true, includeResultMetadata: true, ...options },
  );

  if (!result || !result.value) return null;

  return result.value;
};

export const deleteContact = async (id) => {
  const contact = await ContactsCollection.findOneAndDelete({ _id: id });
  return contact;
};
