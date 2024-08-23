'use client';

import React from 'react';
import logout from '../login/actions';
import { Button } from '@repo/ui/components/ui/button';

export default function LogoutButton() {
  const onClick = async () => {
    await logout();
  };

  return <Button onClick={onClick}>Logout</Button>;
}
