import { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";

import {
  ReplaceTheme,
  UpdateTheme,
  Colors,
  Theme,
  RecursivePartial,
} from "../types";

interface UseTheme<C> {
  replaceTheme: ReplaceTheme<C>;
  updateTheme: UpdateTheme<C>;
  theme: {
    colors: RecursivePartial<Colors>;
  } & Theme;
}

export const useTheme = <C>(): UseTheme<C> => {
  return useContext(ThemeContext);
};
