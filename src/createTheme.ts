import deepmerge from "deepmerge";

import { CreateThemeOptions, Theme } from "./types";
import defaultTheme from "./defaultTheme";

export const createTheme = <C>(theme: CreateThemeOptions<C> = {}): Theme => {
  return {
    ...theme,
    ...deepmerge(
      {
        spacing: defaultTheme.spacing,
        fontSizes: defaultTheme.fontSizes,
        platformColors: defaultTheme.platformColors,
      },
      {
        colors: theme?.colors
          ? deepmerge(theme?.colors, defaultTheme.colors)
          : defaultTheme.colors,
        colorScheme: theme.colorScheme || defaultTheme.colorScheme,
        spacing: theme.spacing || {},
        components: theme.components || {},
        primaryShade: theme.primaryShade || defaultTheme.primaryShade,
        fontSizes: theme?.fontSizes || {},
      }
    ),
  };
};
