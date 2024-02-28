import React, { Component, LegacyRef, PropsWithChildren } from "react";
import deepmerge from "deepmerge";

import { ThemeConsumer } from "./ThemeProvider";

import {
  FullTheme,
  ThemeProps,
  ThemedComponent as IThemedComponent,
} from "./types";
import defaultTheme from "./defaultTheme";

const isClassComponent = (
  Component: React.ComponentType<unknown>
): Component is React.ComponentClass =>
  Boolean(Component?.prototype?.isReactComponent);

export interface ThemedComponent {
  displayName: string;
}

type StyleCombineFunction = (
  prop1: Record<string, unknown>,
  prop2: Record<string, unknown>
) => Record<string, unknown>[];

const combineByStyles = (propName = ""): StyleCombineFunction | undefined => {
  if (propName.endsWith("Style") || propName.endsWith("style")) {
    return (prop1, prop2) => {
      return [prop1, prop2].flat();
    };
  }
  return undefined;
};

const ThemedComponent = (
  WrappedComponent,
  themeKey: string = "",
  displayName?: string
) => {
  return Object.assign(
    (
      { children, ...rest }: PropsWithChildren<unknown>,
      forwardedRef: LegacyRef<Component<object, unknown, unknown>>
    ) => {
      return (
        <ThemeConsumer>
          {({ theme, updateTheme, replaceTheme }) => {
            let props: object = {};
            // If user isn't using ThemeProvider
            if (!theme) {
              props = {
                ...rest,
                children,
                theme: defaultTheme,
              };
            } else {
              const { components, ...restTheme } = theme;
              props = {
                children,
                theme: restTheme,
                updateTheme,
                replaceTheme,
                ...deepmerge<FullTheme>(
                  typeof components?.[themeKey as keyof typeof components] ===
                    "function"
                    ? components?.[themeKey]?.(rest, restTheme)
                    : components?.[themeKey as keyof typeof components] || {},
                  rest,
                  {
                    customMerge: combineByStyles,
                    clone: false,
                  }
                ),
              };
            }

            return isClassComponent(WrappedComponent) ? (
              <WrappedComponent ref={forwardedRef} {...props} />
            ) : (
              <WrappedComponent {...props} />
            );
          }}
        </ThemeConsumer>
      );
    },
    { displayName }
  );
};

function withTheme<P = unknown, T = unknown>(
  WrappedComponent:
    | IThemedComponent<P>
    | React.ComponentType<P & ThemeProps<T>>,
  themeKey?: string
):
  | React.FunctionComponent<React.PropsWithChildren<P>>
  | React.ForwardRefExoticComponent<
      React.RefAttributes<React.PropsWithChildren<P>>
    > {
  const name = themeKey
    ? `Themed.${themeKey}`
    : `Themed.${
        WrappedComponent.displayName || WrappedComponent.name || "Component"
      }`;

  const Component = ThemedComponent(WrappedComponent, themeKey, name);

  // if (isClassComponent(WrappedComponent)) {
  //   return hoistNonReactStatics(React.forwardRef(Component), WrappedComponent);
  // }

  return Component;
}

export default withTheme;
