import { shadeColors } from "./utils";

export const defaultColors = {
  primary: "#2089dc",
  secondary: "#232F3E",
  dark: "#393e42",
  grey: "#787276",

  success: "#52c41a",
  error: "#ff190c",
  warning: "#faad14",
  disabled: "#c2c2c2",
  divider: "#c2c2c2",
};

// Experimental
const colors = shadeColors(defaultColors);

export default {
  ...colors,
  white: "#ffffff",
  black: "#242424",
  background: "#ffffff",
};
