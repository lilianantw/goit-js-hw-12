import axios from 'axios';

const API_KEY = '43795533-00e69c3734dde476e8d836fd2';
const BASE_URL = 'https://pixabay.com/api/';

export const getImagesByQuery = async (query, page) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 15,
    },
  });
  return response.data;
};
