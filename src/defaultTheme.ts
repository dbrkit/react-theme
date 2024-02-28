import { Theme, ColorScheme } from "./types";
import colors from "./colors";
import spacing from "./spacing";
import fonts from "./fonts";

const defaultTheme: Theme = {
  colors,
  spacing,
  fonts,
  primaryShade: 6,
  colorScheme: ColorScheme.light,
  fontSizes: {
    h1: 32,
    h2: 30,
    h3: 28,
    h4: 22,
    h5: 18,
    h6: 16,
    body: 16,
    xs: 14,
  },
};

export default defaultTheme;
