import { ComponentFunctionProps, ComponentTheme } from "./components";
import { RecursivePartial, Tuple } from "./utils";

export type Size = "xs" | "sm" | "md" | "lg" | "xl" | string;

export type NumberSize = Size | number | string;
export type Sizes = Record<Size, number>;

export type Shade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type DefaultColor =
  | "grey"
  | "dark"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "disabled"
  | "divider"
  | "white"
  | "black"
  | "background";

export type CustomColor = string & Record<string, unknown>;
export type Colors = Record<
  DefaultColor | CustomColor,
  Tuple<string, 10> | string[] | string
>;

export type Color = keyof Colors;

export type PlatformColors = {
  ios: Colors;
  android: Colors;
  web: Colors;
};

export type Fonts = Record<
  string,
  {
    fontFamily?: string;
    fontWeight?: string;
  }
>;

export type PlatformFonts = {
  ios?: Fonts;
  android?: Fonts;
  web?: Fonts;
};

export enum ColorScheme {
  light = "LIGHT",
  dark = "DARK",
}

export type Theme = {
  colors: Partial<Colors>;
  platformColors?: PlatformColors;
  colorScheme?: ColorScheme;
  spacing: Sizes;
  primaryShade: Shade; // Index of color from theme.colors that is considered primary, Shade type is 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  fontSizes?: Sizes;
  fonts?: PlatformFonts;
};

export interface FullTheme extends ComponentTheme, Theme {
  colors: Colors;
}

export interface CreateThemeOptions<C> extends RecursivePartial<Theme> {
  colors?: Partial<Colors>;
  components?: ComponentFunctionProps<C>;
}

export interface ThemeOptions<C> extends Theme {
  colorScheme?: ColorScheme;
  components?: ComponentFunctionProps<C>;
}

export type UpdateTheme<C> = (
  myNewTheme:
    | CreateThemeOptions<C>
    | ((myTheme: CreateThemeOptions<C>) => CreateThemeOptions<C>)
) => void;

export type ReplaceTheme<C> = (
  updates:
    | CreateThemeOptions<C>
    | ((myTheme: CreateThemeOptions<C>) => CreateThemeOptions<C>)
) => void;

export type ThemeProps<T = Record<string, unknown>, C = ComponentTheme> = {
  theme: ThemeOptions<C> & T;
  updateTheme: UpdateTheme<C>;
  replaceTheme: ReplaceTheme<C>;
};
