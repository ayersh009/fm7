// supabase.js

import { createClient } from '@supabase/supabase-js';

// Initialize a Supabase client
const supabaseUrl = 'https://jjprnnadnbgruhcfztgc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqcHJubmFkbmJncnVoY2Z6dGdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyMjA3MzgsImV4cCI6MjAyNDc5NjczOH0.TbCsCoptx1-JwUhZgFdS5eDeWQc1fe2-InALxn-t0lo';
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
