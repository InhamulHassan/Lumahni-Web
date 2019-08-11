import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_DEVELOPMENT_SERVER_URL,
  timeout: 2500
});

export { instance as default };
