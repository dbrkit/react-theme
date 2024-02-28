import { Colors, Theme } from "./theme";

export interface ComponentTheme {}

export type ComponentFunctionProps<Components = ComponentTheme> = {
  [Key in keyof Components]?:
    | Components[Key]
    | ((
        props: Components[Key],
        theme: Theme & { colors: Colors }
      ) => Components[Key]);
};

export type ThemedComponent<T> = React.FunctionComponent<
  T & {
    theme?: Theme;
    children?: React.ReactNode | undefined;
  }
>;
