import React, { useContext, useState } from "react";

// this custom hook for providing the global state of the filters so that we can do processing of the data based on these filters options

export const FilterContext = React.createContext(undefined);
export const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState({ state: -1, city: -1 });
  const data = { filter, setFilter };
  return (
    <FilterContext.Provider value={data}>{children}</FilterContext.Provider>
  );
};

const useFilter = () => {
  const context = useContext(FilterContext);
  return context;
};
export default useFilter;
