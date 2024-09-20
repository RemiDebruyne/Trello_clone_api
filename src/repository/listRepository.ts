import { db } from "../../config/db.ts";
import { lists, cards } from "../db/schema.ts";
import { eq } from "drizzle-orm";

export const getAllCards = async (id: number) => {
  return await db.query.cards.findMany({
    columns: {id: true, name: true, listId: true, index: true},
    where: eq(cards.listId, id)
  })
}

export const add = async (list: any) => {
  return await db
    .insert(lists)
    .values({ name: list.name, tableId: list.tableId, index: list.index });
};

export const update = async (id: number, list: any) => {
  return await db
    .update(lists)
    .set({
      name: list.name,
      index: list.index
    })
    .where(eq(lists.id, id));
};

export const deleteList = async (id: number) => {
  return await db.delete(lists).where(eq(lists.id, id));
};
