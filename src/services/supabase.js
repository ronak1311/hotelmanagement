
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://awkrgplxmwfhejluhxot.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3a3JncGx4bXdmaGVqbHVoeG90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2MzI0MDIsImV4cCI6MjAyNDIwODQwMn0.4lum2FxQVdgBVVuezBOfR43kSI8M-hoUziCNRJX93Wg';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;