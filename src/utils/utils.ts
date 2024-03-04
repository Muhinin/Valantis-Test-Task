import { md5 } from "js-md5";
import { apiPassword } from "../constants/constants";

export const getCurrentDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear();
  return `${year}${month}${day}`;
};

export const getHeaders = () => {
  const headers = new Headers();
  headers.append("X-Auth", `${md5(`${apiPassword}_${getCurrentDate()}`)}`);
  headers.append("content-type", "application/json");
  return headers;
};

