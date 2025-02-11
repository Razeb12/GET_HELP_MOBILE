import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://mtkuvqmashzlecqepqyo.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10a3V2cW1hc2h6bGVjcWVwcXlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1MDA3MDcsImV4cCI6MjA1NDA3NjcwN30.seVCMKqn2baCh5WADlPP01P8a2BfCQW8PRhY8CnBnWg"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})