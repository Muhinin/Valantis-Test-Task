import { md5 } from "js-md5";
import { apiPassword } from "../constants/constants";

export const getCurrentDate = (): string => {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear();
  return `${year}${month}${day}`;
};

export const getHeaders = (): Headers => {
  const headers = new Headers();
  headers.append("X-Auth", `${md5(`${apiPassword}_${getCurrentDate()}`)}`);
  headers.append("content-type", "application/json");
  return headers;
};

export const hasKeysInObject = (object: Record<string, unknown>): boolean =>
  !!Object.values(object).filter((item) => item).length;
