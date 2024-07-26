import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
  Authorization: `bearer ${TMDB_TOKEN}`,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const fullUrl = `${BASE_URL}${url}`;
    console.log(`Request URL: ${fullUrl}`); // Debugging output
    console.log(`Request Params:`, params); // Debugging output

    const { data } = await axios.get(fullUrl, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    if (error.response) {
      // The server responded with a status code outside the range of 2xx
      console.error('Error Response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error Request:', error.request);
    } else {
      // Something went wrong in setting up the request
      console.error('Error Message:', error.message);
    }
    return error;
  }
};
