import axios from "axios";
import { DEBUG } from "../config/config";

axios.defaults.baseURL = DEBUG ? "http://localhost:8000/api" : "/api";

export default axios;
