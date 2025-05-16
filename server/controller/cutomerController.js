import * as customerServices from "../services/customer";

//get all customer
export const getAllCustomer = async (req, res) => {
  try {
    const response = await customerServices.getAllCustomerService()
    return res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ ["Fail at get all customer:"]: error.message });
  }
};
//get one customer
export const getOneCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await customerServices.getOneCustomerService(id)
    return res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ ["Fail at get one customer:"]: error.message });
  }
};
//update customer
export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await customerServices.updateCustomerService(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at update customer:"]: error.message });
  }
};