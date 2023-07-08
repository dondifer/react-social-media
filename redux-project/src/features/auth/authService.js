import axios from "axios";
import { API_URL } from "../../config/key";

const register = async (userData) => {
  const res = await axios.post(`${API_URL}/users/register`, userData);
  return res.data;
};

const authService = {
  register,
};

export default authService;
