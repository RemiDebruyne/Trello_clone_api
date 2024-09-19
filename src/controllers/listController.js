import { db } from "../../config/db.ts";
import { lists } from "../db/schema.ts";
import { eq } from "drizzle-orm";
import * as listRepository from '../repository/listRepository.ts'

export const addList = async (req, res) => {
  try {
    const list = req.body;
    const result = await listRepository.add(list)

    if (result[0].affectedRows === 0) {
      res.status(404).send("Erreur 404 - bad request");
      return;
    }

    res.json({
      message: 'List was created successfully',
      card: {
        id: result[0].insertId,
        ...list
      }
    })

  } catch (error) {
    console.log(error);
  }
};

export const updateList = async (req, res) => {
  try {
    const idFromRoute = req.params.id;
    const list = req.body;
    const result = await listRepository.update(idFromRoute, list)

    if (result[0].affectedRows === 0) {
      res.status(404).send("Erreur 404 - bad request");
      return;
    }

    res.json({
      message: "list updated succesfuly",
      table: {
        id: idFromRoute,
        ...list
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteList = async (req, res) => {
  try {
    const idFromroute = req.params.id;
    const result = await listRepository.deleteTable(idFromroute)

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
