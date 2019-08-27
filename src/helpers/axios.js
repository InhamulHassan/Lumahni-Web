import axios from "axios";
import history from "./history";

const instance = axios.create({
  baseURL: process.env.REACT_APP_DEVELOPMENT_SERVER_URL,
  timeout: 5000
});

export { instance as default };
