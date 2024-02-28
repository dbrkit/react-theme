import React from "react";
import deepmerge from "deepmerge";

import {
  ThemeProps,
  ThemeOptions,
  CreateThemeOptions,
  UpdateTheme,
  ReplaceTheme,
  Theme,
  ComponentTheme,
} from "./types";
import { createTheme } from "./createTheme";

export type ThemeProviderContext<T = object, C = ComponentTheme> = ThemeProps<
  ThemeOptions<C> & T
>;

export const ThemeContext = React.createContext<ThemeProviderContext>(
  {} as ThemeProviderContext
);

export function ThemeProvider<C>({
  theme = {},
  children,
}: {
  theme?: CreateThemeOptions<C>;
  children?: React.ReactNode;
}) {
  const [themeState, setThemeState] = React.useState<Theme>(createTheme(theme));

  const updateTheme: UpdateTheme<C> = React.useCallback((updatedTheme) => {
    setThemeState((oldTheme) => {
      const newTheme =
        typeof updatedTheme === "function"
          ? updatedTheme(oldTheme)
          : updatedTheme;
      return deepmerge({ ...oldTheme }, newTheme);
    });
  }, []);

  const replaceTheme: ReplaceTheme<C> = React.useCallback((replacedTheme) => {
    setThemeState((oldTheme) => {
      const newTheme =
        typeof replacedTheme === "function"
          ? replacedTheme(oldTheme)
          : replacedTheme;
      return createTheme(newTheme);
    });
  }, []);

  const ThemeContextValue = React.useMemo(
    () => ({
      theme: themeState,
      updateTheme,
      replaceTheme,
    }),
    [themeState, updateTheme, replaceTheme]
  );

  return (
    <ThemeContext.Provider value={ThemeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export const ThemeConsumer = ThemeContext.Consumer;
