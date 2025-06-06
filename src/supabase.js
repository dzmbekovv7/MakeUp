// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gbdiwsnxsduhahibzrqg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdiZGl3c254c2R1aGFoaWJ6cnFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NDAzMTYsImV4cCI6MjA2MzUxNjMxNn0.KnqqfWuodeklWX5oEiiEVY278w2EKp9BvkqEyqESbfg'

export const supabase = createClient(supabaseUrl, supabaseKey)
