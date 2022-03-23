import axios from "axios";
var env = process.env.NODE_ENV || 'development';
axios.defaults.baseURL = env === 'development' ? "http://localhost:8000/api" : "/api";

export default axios;
