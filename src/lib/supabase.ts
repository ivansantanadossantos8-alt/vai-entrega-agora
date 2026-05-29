import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wcvytfedupbovtgqltjqf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjdnlmZWR1cGJvdnRncWx0anFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMTM4NDksImV4cCI6MjA5NTU4OTg0OX0.QHvIRTCySQ-XU3kwjemT87rrGGNFh-ZaYr4xeHoerD4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
