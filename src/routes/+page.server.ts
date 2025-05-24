import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { TaskCategory } from '$lib/types';

export const load: PageServerLoad = async ({ locals }) => {
  const { supabase } = locals;

  // Fetch all necessary fields: id, name, slug, description
  const { data: taskCategoriesFromDb, error: dbError } = await supabase
    .from('task_categories')
    .select('id, name, slug, description')
    .order('name', { ascending: true }); 

  if (dbError) {
    console.error('Supabase query error fetching task categories for Combobox:', dbError);
    error(500, { message: 'Failed to load task categories from the database.' });
  }

  return {
    taskCategories: (taskCategoriesFromDb as TaskCategory[]) ?? [],
  };
};