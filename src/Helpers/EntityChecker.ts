import { eq, count, ConsoleLogWriter } from "drizzle-orm";
import { db } from "../../config/db.ts";
import { tables, lists, cards } from "../db/schema.ts";
import { MySqlTableWithColumns } from "drizzle-orm/mysql-core";

export async function checkIfEntityExist(id: number, entity: any) {
  switch (entity) {
    case tables: {
      const query = await db.query.tables.findFirst({
        columns: { id: true },
        where: eq(tables.id, id),
      });
      if(!query){
        return false;
      }

      return true;
    }
    case lists: {
      const query = await db.query.lists.findFirst({
        columns: { id: true },
        where: eq(lists.id, id),
      });
      return query ? true : false;
    }

    case cards: {
      const query = await db.query.cards.findFirst({
        columns: { id: true },
        where: eq(cards.id, id),
      });
      return query ? true : false;
    }
    default:
      return false;
  }
}
