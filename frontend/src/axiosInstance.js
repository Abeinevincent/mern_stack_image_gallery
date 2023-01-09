import axios from "axios";

const token = localStorage.getItem("token");

export default axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    token: `Bearer ${token}`,
  },
});
