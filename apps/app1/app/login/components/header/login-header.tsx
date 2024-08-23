import React from 'react';

import Link from 'next/link';
import { Button } from '@repo/ui/components/ui/button';

export default function LoginHeader() {
  return (
    <div>
      <header className='flex h-16 justify-between px-4  items-center '>
        <div className=''>
          <Button asChild variant='ghost'>
            <Link href={'/'} className='text-lg font-bold  '>
              LOGO
            </Link>
          </Button>
        </div>

        <div>
          <Button variant='ghost'>
            <Link href={'/'}>ホーム</Link>
          </Button>
        </div>
      </header>
    </div>
  );
}
