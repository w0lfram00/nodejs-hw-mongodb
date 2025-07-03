import { SORT_ORDER } from '../constants/index.js';

const parseSortOrder = (sortOrder) => {
  if ([SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder)) return sortOrder;
  return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  const keysOfContacts = [
    '_id',
    'name',
    'phoneNumber',
    'email',
    'isFavourite',
    'contactType',
  ];

  if (keysOfContacts.includes(sortBy)) return sortBy;
  return '_id';
};

export const parseSortParams = ({ sortOrder, sortBy }) => {
  return {
    sortOrder: parseSortOrder(sortOrder),
    sortBy: parseSortBy(sortBy),
  };
};
