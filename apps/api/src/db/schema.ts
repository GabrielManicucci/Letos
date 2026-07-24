import { boolean, integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  user_id: uuid().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  pro: boolean(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const userTeam = pgTable("user_team", {
  user_id: varchar().references(() => usersTable.user_id),
  team_id: varchar().references(() => teamTable.team_id),
  created_at: timestamp().defaultNow()
})

export const teamTable = pgTable("team", {
  team_id: uuid().primaryKey(),
  name: varchar({ length: 55 }).notNull(),
  created_at: timestamp().defaultNow()
})

export const usersSavedRoadmapTable = pgTable("users_saved_roadmap", {
  user_id: varchar().references(() => usersTable.user_id),
  roadmap_id: varchar().references(() => roadmapTable.roadmap_id),
})

export const roadmapTable = pgTable("roadmap", {
  roadmap_id: uuid().primaryKey(),
  title: varchar({ length: 55 }).notNull(),
  description: text(),
  created_at: timestamp().defaultNow(),
  creator_id: varchar().references(() => usersTable.user_id)
})
