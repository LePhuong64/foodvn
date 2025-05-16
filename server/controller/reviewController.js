import * as reviewServices from "../services/review";

//create review
export const createReviewController = async (req, res) => {
  const { reviews } = req.body;
  try {
    const response = await reviewServices.createReviewService({reviews,});
    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at create review:"]: error.message });
  }
};

//get theo id đơn
export const getReviewByOrderController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await reviewServices.getReviewsByOrderIDService(id);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at get one review:"]: error.message });
  }
};

//get theo id món ăn
export const getReviewByFoodController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await reviewServices.getReviewsByFoodService(id);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at get one review:"]: error.message });
  }
};

//get all
export const getAlReviewController = async (req, res) => {
  try {
    const result = await reviewServices.getAllReviewsService();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ ["Fail at get all review:"]: error.message });
  }
};
