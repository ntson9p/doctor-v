/**
 * The compiled knowledge base, generated at build time from knowledge/ and loaded by the check
 * page at run time (kept out of the JavaScript bundle). The build fails if the data has errors.
 */
import type { APIRoute } from 'astro';
import { builtKnowledge } from '../../lib/build-kb.ts';

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(JSON.stringify(builtKnowledge().kb), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
