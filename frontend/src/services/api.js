import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api", // ✅ matches /api/manuals/upload
});

export default instance;
