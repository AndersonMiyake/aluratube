import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://bnqzmmopvwvltmmwgyov.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJucXptbW9wdnd2bHRtbXdneW92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0NTMzMjIsImV4cCI6MTk4NDAyOTMyMn0._VqlcY47slHeqCmSkkvm3COT7S5iIQqLeR64Zls_Fm8";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                .select("*");
        }
    }
}