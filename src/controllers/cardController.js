import { db } from "../../config/db.ts";
import { cards } from "../db/schema.ts";
import { eq } from "drizzle-orm";
import * as cardRepository from "../repository/cardRepository.ts";

export const addCard = async (req, res) => {
  try {
    const card = req.body;
    const result = await cardRepository.add(card);

    if (result[0].affectedRows === 0) {
      res.status(404).send("Erreur 404 - bad request");
      return;
    }

    res.json({
      message: "Card was created successfuly",
      card: { id: result[0].insertId, ...card },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCard = async (req, res) => {
  try {
    const idFromParam = req.params.id;
    const card = req.body;

    const result = await cardRepository.update(idFromParam, card);

    if (result[0].affectedRows === 0) {
      res.status(404).send("Erreur 404 - bad request");
      return;
    }

    res.json({
      message: "card was updated successfully",
      card: {
        id: idFromParam,
        ...card,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCard = async (req, res) => {
  try {
    const idFromParam = req.params.id;
    const result = await cardRepository.deleteTable(idFromParam);

    if (result[0].affectedRows === 0) {
      res.status(404).send("Erreur 404 - bad request");
      return;
    }

    res.send(`Table with id ${idFromParam} was deleted successfully`);
  } catch (error) {
    console.log(error);
  }
};
