import { maxRequestCount, url } from "../constants/constants";
import { getHeaders } from "../utils/utils";

export async function fetchData(action: string, params?: Record<string, string | string[]| number | undefined>) {
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

  const runRequest = (): Promise<any> => {
    return request()
      .then((res) => res.json())
      .then((data) => data)
      .catch((e) => {
        if (attemptsCount > maxRequestCount)
          throw new Error("Превышено допустимое количество попыток запроса");
        console.error(e);
        return runRequest();
      });
  };

  return runRequest();
}
