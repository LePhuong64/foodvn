import express from 'express';
import * as employeeController from '../controller/employeeController.js';
import upload from '../services/upload';

const router = express.Router();
//create employee order
router.post('/order', upload.single("image") ,employeeController.createEmployee);
//create chef
router.post('/chef',upload.single("image"),employeeController.createChef);
//get all employee
router.get('/all', employeeController.getAllEmployee);
//get one employee
router.get('/:id', employeeController.getOneEmployee);
//delete employee
router.delete('/:id',upload.single("image"),employeeController.deleteEmployee);
//update employee
router.put('/:id',upload.single("image"),employeeController.updateEmployee);
export default router;