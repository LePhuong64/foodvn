import express from 'express';
import * as cartController from '../controller/cartController.js';

const router = express.Router();

//create card
router.post('/add', cartController.createCart);
//get card
router.get('/:customerID', cartController.getCart);
//delete card
router.delete('/:customerID/:foodID', cartController.deleteCart);
router.delete('/:customerID', cartController.deleteAllCart);
//update card
router.put('/update', cartController.updateCart);

export default router;   