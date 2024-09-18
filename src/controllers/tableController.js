import { db } from "../../config/db.ts";
import { tables} from "../db/schema.ts";
import { eq  } from "drizzle-orm";
import { checkIfEntityExist } from "../Helpers/EntityChecker.js";

export const getTables = async (req, res) => {
  try {
    const result = await db.query.tables.findMany({
      columns: { id: true, name: true },
      with: { lists: { with: { cards: true } } },
    });
    res.json(result);
  } catch (error) {
    console.log(error);
  }

  // Exemple de requête avec la syntaxe sql like
  // try {
  //   const result = await db
  //     .select({
  //         tableId: tables.id,
  //         tableName: tables.name,
  //         listId: lists.id,
  //         listName: lists.name,
  //     })
  //     .from(tables)
  //     .leftJoin(lists, eq(tables.id, lists.tableId))
  //   // .leftJoin(cards, eq(lists.id, cards.listId));

  //   res.json(result);
  // } catch (error) {
  //   console.log(error);
  // }

  // Exemple de requete manuelle en sql
  // const QUERY =
  //   "SELECT t.tableId, t.name AS tableName, l.listId, l.name AS listName, c.cardId, c.name AS cardname FROM Tables AS t LEFT JOIN Lists AS l ON t.tableId=l.tableId LEFT JOIN Cards AS c ON l.listId=c.listId;";

  // try {
  //   const [results] = await connection.query(QUERY);
  //   res.json(results);
  // } catch (error) {
  //   console.log(error);
  // }
};

export const getTableById = async (req, res) => {
  const tableId = req.params.id;

  if (!await checkIfEntityExist(tableId, tables)) {
    res.status(404).send("erreur 404a");
    return;
  }

  try {
    const result = await db.query.tables.findFirst({
      columns: { id: true, name: true },
      with: {
        lists: { with: { cards: true } },
      },
      where: eq(tables.id, tableId),
    });

    if (!result) {
      res.status(404).send("Erreur 404 - bad request");
    }

    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const addTable = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await db.insert(tables).values({ name: name });
    // res.json(result)
    res.json({
      message: "Table was successfuly created",
      table: { id: result[0].insertId, name: name },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTable = async (req, res) => {
  const tableId = req.params.id;
  if (!await checkIfEntityExist(tableId, tables)) {
    res.status(404).send("erreur 404");
    return;
  }

  const table = req.body;
  try {
    const result = await db
      .update(tables)
      .set({
        name: table.name,
      })
      .where(eq(tables.id, tableId));

    res.json({
      message: "table updated succesfuly",
      table: {
        name: table.name,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTable = async (req, res) => {
  const tableId = req.params.id;
  try {
    if (!await checkIfEntityExist(tableId, tables)) {
      res.status(404).send("erreur 404aaa");
      return;
    }

    const result = await db.delete(tables).where(eq(tables.id, tableId));
    res.json({
      message: `Table with id ${tableId} was deleted successfuly`,
    });
  } catch (error) {
    console.log(error);
  }
};
