import { Router } from 'express'; import * as c from '../controllers/customer.controller'; import { asyncHandler } from '../utils/async-handler';
export const customerRouter=Router(); customerRouter.get('/',asyncHandler(c.list)); customerRouter.post('/',asyncHandler(c.create));
