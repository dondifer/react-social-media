import axios from "axios";
import { API_URL } from "../../config/key";

const register = async (userData) => {
  const res = await axios.post(`${API_URL}/users/register`, userData);
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(API_URL + "/users/login", userData);
  if (res.data) {
    console.log(res);
    localStorage.setItem("token", JSON.stringify(res.data.token));
  }
  return res.data;
};

const logout = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.delete(API_URL + "/users/logout", {
    headers: {
      authorization: token,
    },
  });
  if (res.data) {
    localStorage.clear();
  }
  return res.data;
};

const getInfo = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.get(API_URL + "/users/info", {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const postDelete = async (postId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.delete(`${API_URL}/posts/delete/${postId}`, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const postUpdate = async (post) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.put(API_URL + "/posts/update/" + post.id, post, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const authService = {
  register,
  login,
  logout,
  getInfo,
  postDelete,
  postUpdate,
};

export default authService;
