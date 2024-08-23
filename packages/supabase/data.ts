import 'server-only';

import { createClient } from './server';
import { redirect } from 'next/navigation';

export const getSessionUrl = async () => {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error('Auth Error:', error.message);
    return redirect('/login');
  }

  const id = user?.id;
  if (!id) {
    return redirect('/login');
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('url,type')
    .eq('user_id', id)
    .single();

  if (userError) {
    console.error('Fetch Error:', userError.message);
    return redirect('/login');
  }

  return userData || redirect('/login');
};
