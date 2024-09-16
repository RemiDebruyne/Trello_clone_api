import { connection } from "../../config/db.js";

export const getTables = async (req, res) => {
  const QUERY =
    "SELECT t.tableId, t.name AS tableName, l.listId, l.name AS listName, c.cardId, c.name AS cardname FROM Tables AS t LEFT JOIN Lists AS l ON t.tableId=l.tableId LEFT JOIN Cards AS c ON l.listId=c.listId;";

  try {
    const [results] = await connection.query(QUERY);
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};

export const getTableById = async (req, res) => {
  const tableId = req.params.id;
  const QUERY = `SELECT t.tableId, t.name, l.listId, l.name, c.cardId, c.name FROM Tables AS t RIGHT JOIN Lists AS l ON t.tableId=l.tableId RIGHT JOIN Cards AS c ON l.listId=c.listId WHERE t.tableId = ${tableId}; `;

  try {
    const results = await connection.query(QUERY);
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};

export const addTable = async (req, res) => {
  try {
    const { nom } = req.body;
    const QUERY = `INSERT INTO Tables (name) VALUES (?)`;
    const [results] = await connection.query(QUERY, [nom]);
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};

export const updateTable = async (req, res) => {
  const tableId = req.params.id;
  try {
    const QUERY = `UPDATE Tables SET name = (?) WHERE tableId = ${tableId};`;
    const [results] = await connection.query(QUERY, [req.body.name]);
    res.json(results)
  } catch (error) {
    console.log(error);
  }
};

export const deleteTable = async (req, res) => {
  const tableId = req.params.id;
  try {
    const QUERY = `DELETE FROM Tables WHERE tableId = ${tableId}`;
    const [results] = await connection.query(QUERY);
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};
