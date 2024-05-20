import axios from "axios";

// create an axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export { api };
