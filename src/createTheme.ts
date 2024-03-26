import deepmerge from "deepmerge";

import { CreateThemeOptions, Theme } from "./types";
import defaultTheme from "./defaultTheme";

export const createTheme = <C>(theme: CreateThemeOptions<C> = {}): Theme => {
  return deepmerge(defaultTheme, theme, {
    // Custom merge function
    isMergeableObject: (obj) => {
      return obj !== null && typeof obj === "object" && !Array.isArray(obj);
    },
  });
};
