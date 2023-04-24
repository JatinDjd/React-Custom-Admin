import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://191.101.3.45',
  });