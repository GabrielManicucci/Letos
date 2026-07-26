import type { Context } from 'hono';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../db';
import { usersTable } from '../db/schema';
import { createUserDto, updateUserDto } from './users.dtos';

export const listUsers = async (c: Context) => {
  const users = await db.select().from(usersTable);
  return c.json(users);
};

export const getUser = async (c: Context<{}, '/:id'>) => {
  const id = c.req.param('id');
  const [user] = await db.select().from(usersTable).where(eq(usersTable.userId, id));
  if (!user) return c.json({ error: 'User not found' }, 404);
  return c.json(user);
};

export const createUser = async (c: Context) => {
  const body = await c.req.json();
  const parsed = createUserDto.safeParse(body);
  if (!parsed.success) return c.json({ error: z.treeifyError(parsed.error) }, 400);
  const [user] = await db.insert(usersTable).values(parsed.data).returning();
  return c.json(user, 201);
};

export const updateUser = async (c: Context<{}, '/:id'>) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const parsed = updateUserDto.safeParse(body);

  if (!parsed.success) return c.json({ error: z.treeifyError(parsed.error) }, 400);

  const [user] = await db
    .update(usersTable)
    .set(parsed.data)
    .where(eq(usersTable.userId, id))
    .returning();

  if (!user) return c.json({ error: 'User not found' }, 404);

  return c.json(user);
};

export const deleteUser = async (c: Context<{}, '/:id'>) => {
  const id = c.req.param('id');
  const [user] = await db
    .delete(usersTable)
    .where(eq(usersTable.userId, id))
    .returning();
  if (!user) return c.json({ error: 'User not found' }, 404);
  return c.body(null, 204);
};
