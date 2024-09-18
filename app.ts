import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { tableRouter } from "./src/routes/tableRoutes.js";
import { listRouter } from "./src/routes/listRoutes.js";
import "dotenv/config";

const PORT = process.env.PORT;
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use("/tables", tableRouter);
app.use("/lists", listRouter);

app.get("*", (req, res) => {
  res.status(404).send("Error 404 - Page not found");
});

app.listen(PORT, () => {
  console.log("Server is listening on port : " + PORT);
});
