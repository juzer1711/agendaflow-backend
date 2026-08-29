import { describe, expect, it } from 'vitest'; import request from 'supertest';
process.env.JWT_SECRET = 'test-secret-that-is-long-enough';
import { createApp } from '../src/app'; import { signToken } from '../src/utils/jwt';
describe('auth middleware',()=>it('rejects absent tokens and accepts valid tokens',async()=>{const app=createApp();expect((await request(app).get('/api/services')).status).toBe(401);const token=signToken({userId:1,barberId:1,role:'BARBER',email:'a@example.com'});expect((await request(app).get('/api/auth/me').set('Authorization',`Bearer ${token}`)).status).toBe(200);}));
