import color from "color";
import { Shade, Tuple } from "../types";

export interface Options {
  numShades: number;
  shadePercentage: number;
  primaryShade: Shade;
}

const initialOptions = {
  numShades: 9,
  shadePercentage: 0.2,
  primaryShade: 6,
};

export function generateColorShades<N extends number>(
  value: string,
  options?: Options
): Tuple<string, N> {
  const shades = [];

  const { numShades, primaryShade, shadePercentage } = {
    ...initialOptions,
    ...options,
  };

  const numShadesLeft = primaryShade - 1;
  const numShadesRight = numShades - numShadesLeft - 1;

  for (let i = primaryShade; i >= primaryShade - numShadesLeft; i--) {
    const lightness = (primaryShade - i) / (numShadesLeft + 1);
    const shadeColor = color(value)
      .lighten(lightness * shadePercentage)
      .hex();
    shades.unshift(shadeColor);
  }

  shades.push(value);

  for (let i = primaryShade + 1; i <= primaryShade + numShadesRight; i++) {
    const lightness = (i - primaryShade) / (numShadesRight + 1);
    const shadeColor = color(value)
      .darken(lightness * shadePercentage)
      .hex();
    shades.push(shadeColor);
  }

  return shades as Tuple<string, N>;
}

export default generateColorShades;
