import nodemailer from 'nodemailer';
import { getEnvVar } from './getEnvVar.js';
import { SMTP } from '../constants/index.js';
import createHttpError from 'http-errors';

const transporter = nodemailer.createTransport({
  host: getEnvVar(SMTP.HOST),
  port: getEnvVar(SMTP.PORT),
  auth: {
    user: getEnvVar(SMTP.USER),
    pass: getEnvVar(SMTP.PASSWORD),
  },
});

export const sendEmail = async (options) => {
  try {
    return await transporter.sendMail(options);
  } catch {
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};
