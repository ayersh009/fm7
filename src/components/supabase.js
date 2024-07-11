// supabase.js

import { createClient } from '@supabase/supabase-js';

// Initialize a Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('ordermanager')
      .select('*')
      .order('orderdate', { ascending: false });
  
    if (error) {
      console.error(error);
      return [];
    }
  
    return data;
  };
