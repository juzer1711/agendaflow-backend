import { Router } from 'express'; import { check } from '../controllers/availability.controller'; import { asyncHandler } from '../utils/async-handler';
export const availabilityRouter=Router(); availabilityRouter.get('/',asyncHandler(check));
