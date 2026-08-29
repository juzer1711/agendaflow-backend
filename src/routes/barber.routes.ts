import { Router } from 'express'; import * as c from '../controllers/barber.controller'; import { asyncHandler } from '../utils/async-handler';
export const barberRouter=Router(); barberRouter.get('/profile',asyncHandler(c.getProfile)); barberRouter.put('/profile',asyncHandler(c.updateProfile));
