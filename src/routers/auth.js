import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUserSchema,
  loginWithGoogleSchema,
  registerUserSchema,
  requestResetPasswordEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getGoogleOAuthUrlController,
  loginUserController,
  loginWithGoogleController,
  logoutUserController,
  refreshUsersSessionController,
  registerUserController,
  requestResetPasswordEmailController,
  resetPasswordController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post('/refresh', ctrlWrapper(refreshUsersSessionController));

authRouter.post(
  '/request-reset-email',
  validateBody(requestResetPasswordEmailSchema),
  ctrlWrapper(requestResetPasswordEmailController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  resetPasswordController,
);

authRouter.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

authRouter.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleSchema),
  ctrlWrapper(loginWithGoogleController),
);

export default authRouter;
