import { describe, expect, it } from 'vitest';
process.env.JWT_SECRET = 'test-secret-that-is-long-enough';
import { signToken, verifyToken } from '../src/utils/jwt';
describe('JWT',()=>it('signs and verifies identity',()=>{const token=signToken({userId:1,barberId:2,role:'BARBER',email:'a@example.com'});expect(verifyToken(token)).toMatchObject({userId:1,barberId:2,email:'a@example.com'});}));
