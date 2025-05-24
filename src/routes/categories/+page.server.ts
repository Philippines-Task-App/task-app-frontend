import type { PageServerLoad } from './$types';
import type { TaskCategory } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  const { supabase } = locals;
  const { data, error: dbError } = await supabase
    .from('task_categories')
    .select('name, slug, description');

  if (dbError) {
    console.error('Supabase query error fetching all categories:', dbError);
    error(500, { message: 'Failed to load task categories.' });
  }

  return {
    categories: (data as TaskCategory[]) ?? [],
  };
};