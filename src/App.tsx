import React, { useEffect, useState } from "react";
import { apiActions, productType } from "./types/types";
import { fetchData } from "./api/api";
import "./App.css";

function App() {
  const [data, setData] = useState<productType[] | undefined>(undefined);

  useEffect(() => {
    fetchData(apiActions.GET_IDS, {
      offset: 0,
      limit: 50,
    })
      .then((res) =>
        fetchData(apiActions.GET_ITEMS, { ids: res.result }).then((res) =>
          setData(res.result)
        )
      )
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="App">
      {data &&
        data.map((item: productType) => (
          <div key={item.id}>
            <p>Brand: {item.brand}</p>
            <p>Id: {item.id}</p>
            <p>Price: {item.price}</p>
            <p>Product: {item.product}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
