import axios from "axios";

export const AxiosReq = axios.create({
  baseURL: "https://localhost:7276",
});
