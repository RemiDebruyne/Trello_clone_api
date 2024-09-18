import express, { application } from 'express'
import * as tableController from '../controllers/tableController.js';
const router = express.Router();

router.get('/',  tableController.getTables);
router.get('/:id', tableController.getTableById)
router.post('/create', tableController.addTable)
router.put('/update/:id', tableController.updateTable)
router.delete('/delete/:id', tableController.deleteTable)

export {router as tableRouter}