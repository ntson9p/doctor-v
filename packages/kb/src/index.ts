import { ENGINE_SMOKE } from '@doctor-v/engine';
import { parse } from 'yaml';
import * as z from 'zod';

export const KB_SMOKE: string = `${ENGINE_SMOKE}+kb-ok`;
export const parsed = z.object({ a: z.number() }).parse(parse('a: 1'));
