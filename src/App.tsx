import { useEffect, useState } from "react";
import { apiActions, productType } from "./types/types";
import { fetchData } from "./api/api";
import { Box, Grid, Pagination } from "@mui/material";
import ProductCard from "./components/ProductCard";
import Loader from "./components/Loader";
import Header from "./components/Header";
import { productsPerPage } from "./constants/constants";
import { hasKeysInObject } from "./utils/utils";

function App() {
  const [data, setData] = useState<productType[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [count, setCount] = useState<number>();
  const [activeFilter, setActiveFilter] = useState<
    Record<string, string | undefined>
  >({});
  const [filterOptions, setFilterOptions] =
    useState<Record<string, string[]>>();

  const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const updateCountOfPages = (countOfProducts: number | undefined) =>
    setCount(
      countOfProducts ? Math.ceil(countOfProducts / productsPerPage) : 0
    );

  const getProducts = (action: apiActions) => {
    setIsLoading(true);
    fetchData(
      action,
      action === apiActions.GET_IDS
        ? {
            offset: (currentPage - 1) * productsPerPage,
            limit: productsPerPage,
          }
        : {
            ...activeFilter,
          }
    )
      .then((ids: { result: string[] }) => {
        fetchData(apiActions.GET_ITEMS, {
          ids: Array.from(new Set(ids.result)),
        }).then((items: { result: productType[] }) => {
          if (!items.result) throw new Error();
          const filteredItems: Record<string, productType> = {};
          items.result.forEach((item) => {
            if (filteredItems[item.id] === undefined) {
              filteredItems[item.id] = item;
            }
          });
          setData(Object.values(filteredItems));
          setIsLoading(false);
        });
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    fetchData(apiActions.GET_IDS).then((res) => {
      updateCountOfPages(res.result?.length);
    });
    fetchData(apiActions.GET_FIELDS).then((res) =>
      res.result.forEach((field: string) =>
        fetchData(apiActions.GET_FIELDS, { field }).then((res) =>
          setFilterOptions((prev) => ({
            ...prev,
            [field]: Array.from(
              new Set(res.result?.filter((field: string | null) => !!field))
            ),
          }))
        )
      )
    );
  }, []);

  useEffect(() => {
    getProducts(
      hasKeysInObject(activeFilter) ? apiActions.FILTER : apiActions.GET_IDS
    );
  }, [activeFilter, currentPage]);

  return (
    <>
      <Header filterOptions={filterOptions} setActiveFilter={setActiveFilter} />
      <Box
        display="flex"
        flexDirection="column"
        maxWidth="1200px"
        margin="16px auto"
        marginTop="168px"
        gap="16px"
        alignItems="center"
      >
        <Grid container spacing={2}>
          {isLoading ? (
            <Loader />
          ) : (
            data &&
            data.map((product: productType) => (
              <ProductCard product={product} key={product.id} />
            ))
          )}
        </Grid>
        {!isLoading && !hasKeysInObject(activeFilter) && (
          <Pagination
            count={count}
            page={currentPage}
            onChange={onChangePage}
          />
        )}
      </Box>
    </>
  );
}

export default App;
