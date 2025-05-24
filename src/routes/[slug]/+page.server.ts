import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { TaskCategory } from '$lib/types';

export const load: PageServerLoad = async ({ params, locals }) => {
  const { slug } = params;
  const { supabase } = locals; // Access Supabase client from event.locals

  const { data, error: dbError } = await supabase
    .from('task_categories')
    .select('name, description, slug') // Select all needed fields
    .eq('slug', slug)
    .single(); // Expects one row

  if (dbError) {
    console.error('Supabase query error:', dbError);
    // Consider logging more specific errors or handling different types of db errors
    error(500, { message: 'Error fetching task category data from the database.', code: 'DB_ERROR' });
  }

  if (!data) {
    error(404, { message: `Task category with slug "${slug}" not found.`, code: 'NOT_FOUND' });
  }

  // Explicitly cast to TaskCategory if your select statement matches the type
  const category: TaskCategory = data as TaskCategory;

  return {
    category, // This will be available as `data.category` in the Svelte component
  };
};