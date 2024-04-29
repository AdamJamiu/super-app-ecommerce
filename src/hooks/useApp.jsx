import { useContext } from "react";
import { AppContext } from "../provider/AppProvider";

const useApp = () => {
  return useContext(AppContext);
};

export default useApp;
