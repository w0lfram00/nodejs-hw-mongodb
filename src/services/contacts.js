import { contactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async (page, perPage) => {
  const skip = (page - 1) * perPage;

  const contactsQuery = contactsCollection.find();
  const contactsCount = await contactsCollection
    .find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery.skip(skip).limit(perPage).exec();
  const paginationData = calculatePaginationData(contactsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (id) => {
  const contact = await contactsCollection.findById(id);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await contactsCollection.create(payload);
  return contact;
};

export const updateContact = async (id, payload, options) => {
  const result = await contactsCollection.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true, includeResultMetadata: true, ...options },
  );

  if (!result || !result.value) return null;

  return result.value;
};

export const deleteContact = async (id) => {
  const contact = await contactsCollection.findOneAndDelete({ _id: id });
  return contact;
};
