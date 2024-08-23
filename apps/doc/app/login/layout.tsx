import LoginHeader from '../components/header';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className='container py-6'>
        <div className='flex justify-center'>{children}</div>
      </main>
    </div>
  );
}
