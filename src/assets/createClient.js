import {createClient} from "@supabase/supabase-js"

export const supabase = createClient(
    "https://wtgfbcrmdenewqogcqav.supabase.co"
    ,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0Z2ZiY3JtZGVuZXdxb2djcWF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3MTU0ODcsImV4cCI6MjA1MzI5MTQ4N30.GKOXvQYltonLRZ-GSP7QDQOadPVIIjGUKc5X7V6dNx4"
)