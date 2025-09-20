import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

let supabase: SupabaseClient | null = null;
if (supabaseUrl && supabaseAnonKey) {
	try {
		supabase = createClient(supabaseUrl, supabaseAnonKey);
	} catch (e) {
		// eslint-disable-next-line no-console
		console.warn('[supabaseClient] Failed to create client:', e);
		supabase = null;
	}
} else {
	// eslint-disable-next-line no-console
	console.warn('[supabaseClient] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Uploads disabled.');
}

export { supabase };
export const isSupabaseConfigured = () => !!supabase;
