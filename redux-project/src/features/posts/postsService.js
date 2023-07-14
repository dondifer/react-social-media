import axios from "axios";
import { API_URL } from "../../config/key";

const getAll = async () => {
  const res = await axios.get(API_URL + "/posts/getAll");
  return res.data.post;
};

const postsService = {
  getAll,
};

export default postsService;
