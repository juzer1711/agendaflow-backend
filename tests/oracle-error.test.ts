import { describe, expect, it } from 'vitest'; import { mapOracleError } from '../src/utils/oracle-error';
describe('Oracle errors',()=>it('maps unavailable appointments to conflict',()=>{const result=mapOracleError(new Error('ORA-20003: unavailable'));expect(result).toMatchObject({statusCode:409,code:'APPOINTMENT_NOT_AVAILABLE'});}));
