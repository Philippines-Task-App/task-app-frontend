import type { SupabaseClient, Session as SupabaseSession, User as SupabaseUser } from '@supabase/supabase-js';
import type { TaskCategory } from '$lib/types';

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient;
      // for user authentication:
      // getSession: () => Promise<SupabaseSession | null>;
      // session: SupabaseSession | null;
      // user: SupabaseUser | null;
    }

    interface PageData {
      category?: TaskCategory; // For the [slug] page
      categories?: TaskCategory[]; // For page listing all categories
    //   session?: SupabaseSession | null; // To pass session to pages
    }

    interface Error {
      message: string;
      code?: string;
    }
    // interface Platform {}
  }
}

export {};