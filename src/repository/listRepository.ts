import { db } from "../../config/db.ts";
import { lists } from "../db/schema.ts";
import { eq } from "drizzle-orm";

export const add = async (list: any) => {
  return await db
    .insert(lists)
    .values({ name: list.name, tableId: list.tableId });
};

export const update = async (id: number, table: any) => {
  return await db
    .update(lists)
    .set({
      name: table.name,
    })
    .where(eq(lists.id, id));
};

export const deleteTable = async (id: number) => {
  return await db.delete(lists).where(eq(lists.id, id));
};
