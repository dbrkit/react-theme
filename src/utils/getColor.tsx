import color from "color";

import { defaultTheme } from "..";
import { Theme } from "../types";

const getColor = (
  value?: string | string[],
  theme?: Pick<Theme, "primaryShade">
) => {
  if (typeof value === "string") return color(value).hex();

  if (Array.isArray(value)) {
    const primaryShade = theme?.primaryShade || defaultTheme.primaryShade;
    try {
      const test = color(value[primaryShade]).hex();
      return test;
    } catch (e) {
      console.warn(e);
    }
  }

  return undefined;
};

export default getColor;
