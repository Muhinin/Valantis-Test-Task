import { maxRequestCount, url } from "../constants/constants";
import { getHeaders } from "../utils/utils";

export async function fetchData(action: string, params: unknown) {
  let attemptsCount = 0;
  const request = () => {
    attemptsCount++;
    return fetch(url, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        action,
        params,
      }),
    });
  };

  return await request()
    .then((res) => {
      return res.json();
    })
    .then((data) => data)
    .catch((e) => {
      if (attemptsCount > maxRequestCount) throw new Error(e);
      console.error(e);
      return request();
    });
}
