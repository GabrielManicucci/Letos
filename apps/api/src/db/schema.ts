import { boolean, integer, text, timestamp, uuid, varchar, snakeCase, primaryKey } from "drizzle-orm/pg-core";

export const RolesTable = snakeCase.table("roles", {
  roleId: uuid().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
});

export const usersTable = snakeCase.table("users", {
  userId: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  pro: boolean().default(false),
  email: varchar({ length: 255 }).notNull().unique(),
  role: uuid().references(() => RolesTable.roleId),
});

export const teamTable = snakeCase.table("team", {
  teamId: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 55 }).notNull(),
  createdAt: timestamp().defaultNow(),
});

export const userTeam = snakeCase.table("user_team", {
  userId: uuid().references(() => usersTable.userId),
  teamId: uuid().references(() => teamTable.teamId),
  createdAt: timestamp().defaultNow(),

},(t) => [primaryKey({ columns: [t.userId, t.teamId] })]);

export const roadmapTable = snakeCase.table("roadmap", {
  roadmapId: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 55 }).notNull(),
  description: text(),
  createdAt: timestamp().defaultNow(),
  creatorId: uuid().references(() => usersTable.userId),
});

export const usersSavedRoadmapTable = snakeCase.table("users_saved_roadmap", {
  userId: uuid().references(() => usersTable.userId),
  roadmapId: uuid().references(() => roadmapTable.roadmapId),
},(t) => [primaryKey({ columns: [t.userId, t.roadmapId] })]);
