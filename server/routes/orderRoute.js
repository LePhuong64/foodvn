import express from 'express';
import * as orderController from '../controller/orderController';


const router = express.Router();
//get all
router.get('/all',orderController.getAllOrderController);

//create order
router.post('/', orderController.createOrderController);

//get order
router.get('/:id', orderController.getOrderController);

//update 
router.put('/update',orderController.updateOrderController);

//update status
router.put("/update-food-status", orderController.updateFoodSatus);
router.put("/update-order-status", orderController.updateOrderSatus);


export default router;  