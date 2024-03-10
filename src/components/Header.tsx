import {
  Autocomplete,
  Avatar,
  Box,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import ValantisImage from "../assets/images/valantis.png";
import { Dispatch, SetStateAction } from "react";

interface IHeader {
  filterOptions?: Record<string, string[]>;
  setActiveFilter: Dispatch<
    SetStateAction<Record<string, string | undefined>>
  >;
}

const Header: React.FC<IHeader> = ({ filterOptions, setActiveFilter }) => {
  const onActiveFilterChange = (filterFiled: string, value: string | null) => {
    setActiveFilter((prev) => ({
      ...prev,
      [filterFiled]: value === null ? undefined : value,
    }));
  };

  return (
    <Box position="fixed" top={0} width="100vw" sx={{ bgcolor: "white" }}>
      <Box maxWidth="1200px" margin="0 auto">
        <Box
          display="flex"
          alignItems="center"
          gap="16px"
          padding="8px 0"
        >
          <Avatar src={ValantisImage} sx={{ width: 64, height: 64 }} />
          <Typography variant="h4">Valantis Jewelry</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          gap="16px"
          padding="8px"
        >
          <Typography>Фильтры</Typography>
          {filterOptions ? (
            Object.keys(filterOptions).map((filterField) => (
              <Autocomplete
                id={`filter-${filterField}`}
                key={`filter-${filterField}`}
                options={filterOptions?.[filterField]}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label={filterField} />
                )}
                size="small"
                getOptionLabel={(option) => String(option)}
                onChange={(e, value) =>
                  onActiveFilterChange(filterField, value)
                }
              />
            ))
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
