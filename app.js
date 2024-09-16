const express = require("express");
const bodyparser = require('body-parser')
require('dotenv').config()

const PORT = process.env.PORT;
const app = express();



app.listen(PORT, () => {
    console.log("Server is listening on port : " + PORT);
  });
  