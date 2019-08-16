import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_DEVELOPMENT_SERVER_URL,
  timeout: 5000
});

// Set the AUTH token for any request
instance.interceptors.request.use(function(config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${JSON.parse(token)}` : "";
  return config;
});

export { instance as default };
