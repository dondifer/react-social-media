import axios from "axios";
import { API_URL } from "../../config/key";

const getAll = async () => {
  const res = await axios.get(API_URL + "/posts/getAll");
  return res.data.post;
};

const findByTitle = async (postTitle) => {
  const res = await axios.get(API_URL + "/posts/findByTitle/" + postTitle);
  return res.data;
};

const postNew = async (postData) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.post(`${API_URL}/posts`, postData, {
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

const findById = async (postId) => {
  const res = await axios.get(API_URL + "/posts/findById/" + postId);
  return res.data;
};

const update = async (post) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.put(API_URL + "/posts/update/" + post.id, post, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const like = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.put(
    `${API_URL}/posts/like/${id}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const unlike = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.delete(`${API_URL}/posts/unlike/${id}`, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const postsService = {
  getAll,
  findByTitle,
  postNew,
  postDelete,
  findById,
  update,
  like,
  unlike,
};

export default postsService;
