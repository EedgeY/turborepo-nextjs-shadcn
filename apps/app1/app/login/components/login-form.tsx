'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@repo/ui/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';

import { signInWithEmail } from '../actions';
import { mailPasswordFormSchema } from '@repo/supabase/schema';
import PasswordForm from './password-form';
import { useToast } from '../../../../../packages/ui/src/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';

type FormData = z.infer<typeof mailPasswordFormSchema>;

export function EmailPasswordForm({ mode }: { mode: 'login' | 'signup' }) {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(mailPasswordFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;
    const result = await signInWithEmail(email, password);
    const { errorMessage } = result || {};

    if (errorMessage) {
      toast({
        title: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input type='email' placeholder='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <PasswordForm
          form={form}
          name='password'
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
        />

        <Button>{mode === 'login' ? 'ログイン' : '新規登録'}</Button>
      </form>
    </Form>
  );
}
