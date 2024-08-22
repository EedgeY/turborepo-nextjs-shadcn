import { z } from 'zod';

export const mailPasswordFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2),
});

export const usernamePasswordLoginFormSchema = z.object({
  username: z.string(),
  password: z.string().min(2),
});
