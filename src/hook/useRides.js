import React, { useState, useContext } from "react";

// this hook is for providing the global state of the rides to all components

export const RideContext = React.createContext(undefined);

export const RideProvider = ({ children }) => {
  const [globalRide, setGlobalRide] = useState([]);
  const data = { globalRide, setGlobalRide };
  return <RideContext.Provider value={data}>{children}</RideContext.Provider>;
};

const useRides = () => {
  const context = useContext(RideContext);
  return context;
};
export default useRides;
