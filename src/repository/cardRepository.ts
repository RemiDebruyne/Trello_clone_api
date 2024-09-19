import { db } from "../../config/db.ts";
import { cards } from "../db/schema.ts";
import { eq } from "drizzle-orm";

export const add = async (card: any) => {
    return await db
      .insert(cards)
      .values({ name: card.name, listId: card.listId, startDate: new Date()});
  };
  
  export const update = async (id: number, card: any) => {
    return await db
      .update(cards)
      .set({
        name: card.name,
        listId: card.listId,
        description: card.description,
        endDate: card.end_date
      })
      .where(eq(cards.id, id));
  };
  
  export const deleteTable = async (id: number) => {
    return await db.delete(cards).where(eq(cards.id, id));
  };