import express from 'express';
import * as tableController from '../controller/tableController';

const router = express.Router();

//create table
router.post('/', tableController.createTableController);
//get all table
router.get('/', tableController.getAllTableController);
//get all hall
router.get('/hall', tableController.getAllHallController);
//get one table
router.get('/:id', tableController.getOneTableController)

//update table
router.put('/:id', tableController.updateTableController);
//delete table
router.delete('/:id', tableController.deleteTableController);

//create hall
router.post('/hall', tableController.createHallController);
//delete hall
router.delete('/hall/:id', tableController.deleteHallController);
//update hall
router.put('/hall/:id', tableController.updateHallController);

export default router;