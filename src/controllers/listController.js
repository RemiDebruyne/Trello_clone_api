import { db } from "../../config/db.ts";
import { lists } from "../db/schema.ts";
import { eq } from "drizzle-orm";

export const addList = async (req, res) => {
  try {
    const list = req.body;
    const result = await db
      .insert(lists)
      .values({ name: list.name, tableId: list.tableId });
    res.json({
      message: "List was successfuly created",
      table: { id: result[0].insertId, name: list.name, tableId: list.tableId },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateList = async (req, res) => {
  const idFromRoute = req.params.id;

  const list = req.body;
  try {
    const result = await db
      .update(lists)
      .set({
        name: list.name,
      })
      .where(eq(lists.id, idFromRoute));

    if (result[0].affectedRows === 0) {
      res.status(404).send("Erreur 404 - bad request");
      return;
    }

    res.json({
      message: "list updated succesfuly",
      table: {
        id: idFromRoute,
        name: list.name,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteList = async (req, res) => {
  const idFromroute = req.params.id;
  try {
    const result = await db.delete(lists).where(eq(lists.id, idFromroute));

    if (result[0].affectedRows === 0) {
      res.status(404).send("Erreur 404 - bad request");
      return;
    }
    res.json({
      message: `List with id ${idFromroute} was deleted successfuly`,
    });
  } catch (error) {
    console.log(error);
  }
};
