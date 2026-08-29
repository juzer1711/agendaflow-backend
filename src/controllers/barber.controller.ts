import type { Request, Response } from 'express'; import { barberSchema } from '../schemas/barber.schema'; import * as service from '../services/barber.service';
export async function getProfile(req: Request, res: Response): Promise<void> { res.json({ success: true, data: await service.profile(req.user!.barberId) }); }
export async function updateProfile(req: Request, res: Response): Promise<void> { await service.updateProfile(req.user!.barberId, barberSchema.parse(req.body)); res.json({ success: true, data: await service.profile(req.user!.barberId) }); }
