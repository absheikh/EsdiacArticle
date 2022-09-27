import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
// const token = user ? user.token : null;
const API_URL = process.env.REACT_APP_BASE_URL + "/articles";
//get all articles
const getAllArticles = async () => {
  const response = await axios.get(`${API_URL}/all`);

  return response.data;
};

//get my  articles
const getMyArticles = async (token) => {
  const response = await axios.get(`${API_URL}/lists/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

//add  article
const addArticle = async (data, token) => {
  const response = await axios.post(`${API_URL}/addArticle`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

//update  article
const updateArticle = async (data, token) => {
  const { title, content, status, uuid } = data;
  const response = await axios.put(
    `${API_URL}/update/${uuid}`,
    { title, content, status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
//delete  article
const deleteArticle = async (uuid, token) => {
  const response = await axios.delete(
    `${API_URL}/delete/${uuid}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const articleService = {
  getAllArticles,
  getMyArticles,
  addArticle,
  updateArticle,
  deleteArticle,
};

export default articleService;
