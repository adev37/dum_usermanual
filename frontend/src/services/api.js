// src/services/api.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://dum-usermanual.onrender.com/api", // 👈 correct for Render deployment
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
