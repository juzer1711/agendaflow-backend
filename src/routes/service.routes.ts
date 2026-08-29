import { Router } from 'express'; import * as c from '../controllers/service.controller'; import { asyncHandler } from '../utils/async-handler';
export const serviceRouter=Router(); serviceRouter.get('/',asyncHandler(c.list)); serviceRouter.post('/',asyncHandler(c.create)); serviceRouter.put('/:id',asyncHandler(c.update)); serviceRouter.delete('/:id',asyncHandler(c.remove));
