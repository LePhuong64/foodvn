import * as cartService from '../services/cart.js';

//create cart
export const createCart = async (req, res) => {
  const { customerID, foodID, quantity } = req.body;
  try {
    if (!customerID || !foodID || !quantity) {
      return res.status(400).json({ message: 'Vui lòng nhập đủ thông tin!' });
    }
    const response = await cartService.createCartService(customerID, foodID, quantity);
    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ ['Fail at cart']: error.message });
  }
};
//get cart
export const getCart = async (req, res) => {
  const { customerID } = req.params; 
  try {
    if (!customerID) {
      return res.status(400).json({ message: 'Vui lòng nhập đủ thông tin!' });
    }
    const response = await cartService.getCartService(customerID);
    return res.status(200).json(response); // Đổi từ 201 (Created) thành 200 (OK)
  } catch (error) {
    res.status(500).json({ ['Fail at cart']: error.message });
  }
};

//delete cart
export const deleteCart = async (req, res) => {
  const { customerID, foodID } = req.params;
  try {
    if (!customerID || !foodID) {
      return res.status(400).json({ message: 'Vui lòng nhập đủ thông tin!' });
    }
    const response = await cartService.deleteCartService(customerID, foodID);
    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ ['Fail at cart']: error.message });
  }
};
//update cart
export const updateCart = async (req, res) => {
  const { customerID, foodID, quantity } = req.body;
  try {
    if (!customerID || !foodID || !quantity) {
      return res.status(400).json({ message: 'Vui lòng nhập đủ thông tin!' });
    }
    const response = await cartService.updateCartService(customerID, foodID, quantity);
    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ ['Fail at cart']: error.message });
  }
};         
//delete all
export const deleteAllCart = async (req, res) => {
  const { customerID } = req.params;
  try {
    if (!customerID) {
      return res.status(400).json({ message: 'Vui lòng nhập đủ thông tin!' });
    }
    const response = await cartService.deleteAllCartService(customerID);
    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ ['Fail at cart']: error.message });
  }
};