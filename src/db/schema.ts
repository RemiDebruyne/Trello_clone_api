import { table } from "console";
import { relations } from "drizzle-orm";
import {
  int,
  mysqlEnum,
  mysqlTable,
  uniqueIndex,
  varchar,
  serial,
  text,
  date,
} from "drizzle-orm/mysql-core";

export const tables = mysqlTable("Tables", {
  id: int("id").primaryKey().autoincrement().notNull(),
  name: varchar("name", { length: 50 }).notNull(),
});

export const lists = mysqlTable("Lists", {
  id: int("id").primaryKey().autoincrement().notNull(),
  name: varchar("name", { length: 50 }).notNull(),
  tableId: int("tableId")
    .references(() => tables.id)
    .notNull(),
});

export const cards = mysqlTable("Cards", {
  id: int("id").primaryKey().autoincrement().notNull(),
  name: varchar("name", { length: 50 }).notNull(),
  listId: int("listId")
    .references(() => lists.id)
    .notNull(),
  description: text("description"),
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
});

export const tags = mysqlTable("Tags", {
  id: int("id").primaryKey().autoincrement().notNull(),
  name: varchar("name", { length: 50 }).notNull(),
  color: varchar("color", { length: 7 }).notNull(),
});

export const cardTag = mysqlTable("cardTag", {
  id: int("id").primaryKey().autoincrement().notNull(),
  cardId: int("cardId").references(() => cards.id),
  tagId: int('tagId').references(() => tags.id),
});

// RELATIONS

export const tableRelations = relations(tables, ({one, many}) => {
  return {
    lists: many(lists)
  }
})

export const listRelations = relations(lists, ({one, many}) => {
  return {
    table: one(tables, {
      fields: [lists.tableId],
      references: [tables.id]
    }),
    cards: many(cards)
  }
})

export const cardRelations = relations(cards, ({one, many})=> {
  return {
    list: one(lists, {
      fields: [cards.listId],
      references: [lists.id]
    })
  }
})
