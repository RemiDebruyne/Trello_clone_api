import { db } from "../../config/db.ts";
import { tables } from "../db/schema.ts";
import { eq } from "drizzle-orm";
import * as tableRepository from "../repository/tableRepository.ts";
import { resourceLimits } from "worker_threads";

export const getTables = async (req, res) => {
  try {
    const result = await tableRepository.getAll();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const getTableById = async (req, res) => {
  try {
    const tableId = req.params.id;

    if (
      !(await db.query.tables.findFirst({
        columns: { id: true },
        where: eq(tables.id, tableId),
      }))
    ) {
      res.status(404).send("Erreur 404 - bad request");
      return;
    }

    const result = await tableRepository.getById(tableId);
    result.lists.sort((a, b) => a.index - b.index)
    result.lists.map(el => el.cards.sort((a, b) => a.index - b.index))
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const addTable = async (req, res) => {
  try {
    const table = req.body;
    const result = await tableRepository.add(table);

    if (result[0].affectedRows === 0) {
      res.status(404).send("Erreur 404 - bad request");
      return;
    }

    res.json({
      message: "Table was successfuly created",
      table: { id: result[0].insertId, name: table.name },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTable = async (req, res) => {
  const tableId = req.params.id;

  const table = req.body;
  try {
    const result = await tableRepository.update(tableId, table);

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
    const result = await tableRepository.deleteTable(tableId);

    if (result[0].affectedRows === 0) {
      res.status(404).send("Erreur 404 - bad request");
      return;
    }

    res.json({
      message: `Table with id ${tableId} was deleted successfuly`,
    });
  } catch (error) {
    console.log(error);
  }
};
