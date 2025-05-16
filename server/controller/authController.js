import * as authServices from "../services/auth.js";
// register
export const register = async (req, res) => {
  const { email, password, name, phone, birthday } = req.body
  try {
    if (!email || !password || !name || !phone || !birthday) {
      return res.status(400).json({ message: "Vui lòng nhập đủ thông tin!" })
    }
    const response = await authServices.registerService(req.body)
    return res.status(201).json(response)

  } catch (error) {
    res.status(500).json({ ["Fail at auth:"]: error.message });
  }
};
// login for customer
export const login = async (req, res) => {
  const { phone, password, fcmToken } = req.body;

  try {
    if (!phone || !password) {
      return res.status(400).json({ message: "Vui lòng nhập đủ thông tin!" });
    }

    const response = await authServices.loginService({ phone, password, fcmToken });

    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at auth:"]: error.message });
  }
};
