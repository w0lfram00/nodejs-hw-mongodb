import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string()
    .custom('^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$')
    .required(),
  email: Joi.string().email(),
  isFavourite: Joi.bool(),
  contactType: Joi.string().valid('work', 'personal', 'home'),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().custom(
    '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$',
  ),
  email: Joi.string().email(),
  isFavourite: Joi.bool(),
  contactType: Joi.string().valid('work', 'personal', 'home'),
});
