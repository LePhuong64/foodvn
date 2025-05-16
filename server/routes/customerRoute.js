import express from 'express';
import * as customerController from '../controller/cutomerController.js';

const router = express.Router();
//get all
router.get('/all', customerController.getAllCustomer);
//get one
router.get('/:id', customerController.getOneCustomer);
//update
router.put('/:id',customerController.updateCustomer);
//delete

export default router;