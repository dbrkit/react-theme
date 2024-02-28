import { Colors } from "../types";
import generateColorShades, { Options } from "./generateColorShades";

export function shadeColor(color: string, options?: Options) {
  if (typeof color === "string") {
    return generateColorShades(color, options);
  }
}

export default function shadeColors(
  colors: Record<string, string> | string[],
  options?: Options
) {
  // if (Array.isArray(colors)) {
  //   return colors.map((value) => generateColorShades(value, options));
  // }

  const updatedColors: Partial<Colors> = {};

  Object.keys(colors).forEach((key) => {
    const value = colors[key];

    if (typeof value === "string") {
      const shades = generateColorShades<10>(value, options);
      updatedColors[key] = shades;
    } else {
      updatedColors[key] = value;
    }
  });

  return updatedColors;
}
