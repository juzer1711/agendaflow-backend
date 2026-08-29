import type { Request, Response } from 'express'; import { idSchema } from '../schemas/common'; import { exceptionSchema, scheduleSchema } from '../schemas/schedule.schema'; import * as service from '../services/schedule.service';
export async function list(req:Request,res:Response):Promise<void>{res.json({success:true,data:await service.listSchedules(req.user!.barberId)});}
export async function create(req:Request,res:Response):Promise<void>{const id=await service.createSchedule(req.user!.barberId,scheduleSchema.parse(req.body));res.status(201).json({success:true,data:{scheduleId:id}});}
export async function remove(req:Request,res:Response):Promise<void>{await service.deleteSchedule(req.user!.barberId,idSchema.parse(req.params).id);res.status(204).send();}
export async function listExceptions(req:Request,res:Response):Promise<void>{res.json({success:true,data:await service.listExceptions(req.user!.barberId)});}
export async function createException(req:Request,res:Response):Promise<void>{const id=await service.createException(req.user!.barberId,exceptionSchema.parse(req.body));res.status(201).json({success:true,data:{exceptionId:id}});}
