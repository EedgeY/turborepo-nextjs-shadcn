'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import { FC } from 'react';

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  return <NextThemesProvider {...props}>{props.children}</NextThemesProvider>;
};
