import { db } from "../../config/db.ts";
import { tables } from "../db/schema.ts";
import { ConsoleLogWriter, eq } from "drizzle-orm";

export const getAll = async () => {
    const result = await db.query.tables.findMany({
        columns: { id: true, name: true },
        with: { lists: { with: { cards: true } } },
      });
      return result
}

export const getById = async (id: number) => {
    const result = await db.query.tables.findFirst({
        columns: { id: true, name: true },
        with: {
          lists: { with: { cards: true } },
        },
        where: eq(tables.id, id),
      });
      console.log(result)
      return result
}

export const add = async (table: any) => {
  const result = await db.insert(tables).values({ name: table.name, backgroundUrl: table.backgroundUrl});
  return result;
}

export const update = async(id: number, table: any) => {
    const result = await db
    .update(tables)
    .set({
      name: table.name,
    })
    .where(eq(tables.id, id));

    return result;
}

export const deleteTable = async(id: number) => {
    const result = await db.delete(tables).where(eq(tables.id, id));

    return result;

}