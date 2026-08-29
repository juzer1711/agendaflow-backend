import type { Request, Response } from 'express'; import { availabilitySchema } from '../schemas/availability.schema'; import * as service from '../services/availability.service';
export async function check(req:Request,res:Response):Promise<void>{const q=availabilitySchema.parse(req.query);res.json({success:true,data:{available:await service.isAvailable(req.user!.barberId,q.startAt,q.endAt)}});}
