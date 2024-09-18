import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import  {router as tableRoutes}  from './src/routes/tableRoutes.js'
import 'dotenv/config'

const PORT = process.env.PORT;
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use('/tables', tableRoutes);

app.get('*', (req, res) => {
  res.status(404).send('Error 404 - Page not found')
})

app.listen(PORT, () => {
    console.log("Server is listening on port : " + PORT);
  });
  