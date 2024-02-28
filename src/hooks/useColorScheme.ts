import { useContext, useCallback, useMemo } from "react";

import { ThemeContext } from "../ThemeProvider";
import { ColorScheme } from "../types";

export const useColorScheme = () => {
  const themeContext = useContext(ThemeContext);

  const setColorScheme = useCallback(
    (colorScheme: ColorScheme) => {
      themeContext?.updateTheme({ colorScheme });
    },
    [themeContext]
  );

  return useMemo(
    () => ({
      colorScheme: themeContext?.theme?.colorScheme,
      setColorScheme,
    }),
    [setColorScheme, themeContext?.theme?.colorScheme]
  );
};
