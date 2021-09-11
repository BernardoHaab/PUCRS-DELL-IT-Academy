import { createContext } from "react";
import DatabaseJSONProps from "../types/DatabaseProps";

interface DbContextProps {
  dbJson: DatabaseJSONProps[];
}

const DbContext = createContext<DbContextProps>({
  dbJson: [],
});

export default DbContext;
