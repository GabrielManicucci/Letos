import { z } from 'zod';

export const createUserDto = z.object({
  name: z.string().min(1),
  age: z.number().int().positive(),
  email: z.email(),
  pro: z.boolean().optional(),
});

export const updateUserDto = createUserDto.partial();

export type CreateUserDto = z.infer<typeof createUserDto>;
export type UpdateUserDto = z.infer<typeof updateUserDto>;
