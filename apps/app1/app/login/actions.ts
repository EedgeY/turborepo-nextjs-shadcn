'use server';

import { createClient } from '@repo/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const signInWithEmail = async (email: string, password: string) => {
  const supabase = createClient();
  const { data: signInData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    const messages: {
      [key: string]: string;
    } = {
      'Email not confirmed': 'メールアドレスが確認されていません',
      'Invalid login credentials': 'メールアドレスまたはパスワードが違います',
    };

    return {
      errorMessage:
        error.message && messages[error.message]
          ? messages[error.message]
          : 'ログインに失敗しました',
    };
  }

  const user = signInData?.user;

  if (!user) {
    return {
      errorMessage: 'ユーザーが見つかりません',
    };
  }
  // Customer or Farm によってリダイレクト先を変更
  const { data: userData, error: fetchError } = await supabase
    .from('users')
    .select('type, url')
    .eq('user_id', user.id)
    .single();

  if (fetchError) {
    console.log('Fetch Error:', fetchError.message);

    return {
      errorMessage: 'ユーザーデータの取得に失敗しました',
    };
  }

  if (userData) {
    if (userData.type === 'customer') {
      redirect(`/customer/${userData.url}`);
    } else {
      redirect(`/farm/${userData.url}`);
    }
  } else {
    await supabase.auth.signOut();
    return {
      errorMessage: 'ユーザータイプが無効です',
    };
  }
};

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log('Signup Error:', error.message);
    redirect('/error');
  }

  revalidatePath('/');
  redirect('/');
}

export default async function logout() {
  const supabase = createClient();

  await supabase.auth.signOut();
  revalidatePath('/login');
  redirect('/login');
}

export async function authUserCheck() {
  const supabase = createClient();

  console.log('authUserCheck:', supabase);
}
