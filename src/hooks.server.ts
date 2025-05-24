
import type { Handle } from '@sveltejs/kit';
import { supabase as supabaseClient } from '$lib/server/supabase';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = supabaseClient;
  const response = await resolve(event);
  return response;
};