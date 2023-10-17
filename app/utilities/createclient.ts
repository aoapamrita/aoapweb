import axios from "axios";

const apiclient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export default apiclient;
