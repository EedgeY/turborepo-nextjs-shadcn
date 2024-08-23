import { getSessionUrl } from '@repo/supabase/data';
import { redirect } from 'next/navigation';
import LogoutButton from './components/logout-button';

export default async function Home() {
  const sessionUrl = await getSessionUrl();
  if (!sessionUrl) {
    // ユーザーが認証されていないか、URLが一致しない場合、ログアウトしてログインページにリダイレクト
    return redirect('/login');
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>Hello, {sessionUrl.url}!</h1>
      <LogoutButton />
    </main>
  );
}
