const parseContactType = (contactType) => {
  if (!(typeof contactType === 'string')) return;
  if (['work', 'personal', 'home'].includes(contactType)) return contactType;
};

const parseBool = (bool) => {
  if (!(typeof bool === 'string')) return;
  if (['true', 'false'].includes(bool)) return bool;
};

export const parseFilterParams = ({ isFavourite, contactType }) => {
  return {
    isFavourite: parseBool(isFavourite),
    contactType: parseContactType(contactType),
  };
};
