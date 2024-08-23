import Link from 'next/link';
import { EmailPasswordForm } from './components/login-form';

export default async function LoginPage() {
  return (
    <div>
      <EmailPasswordForm mode='login' />

      <div className='text-sm mt-4 space-y-3'>
        <p>
          <Link href='/c/supabase-password-auth/signup'>新規登録</Link>
        </p>
        <p>
          <Link href='/c/supabase-password-auth/reset-password'>
            パスワードを忘れた方
          </Link>
        </p>
      </div>
    </div>
  );
}
