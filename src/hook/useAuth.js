import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

// global state for proving user state to all the components
const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
export default useAuth;
