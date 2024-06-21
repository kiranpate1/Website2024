import plugin from "tailwindcss/plugin";

interface TypeStyle {
  "font-size"?: string;
  "line-height"?: string;
  "letter-spacing"?: string;
  "font-family"?: string;
  "text-transform"?: string;
}

enum Breakpoints {
  sm = "sm",
  md = "md",
  lg = "lg",
  "xl" = "xl",
  "2xl" = "2xl",
  default = "default",
}

type TypeCategories = {
  [key: string]: TypeStyle;
};

type TypographyBreakpointTable = {
  [key in Breakpoints]?: TypeCategories;
};

function createComponentClass(className: string, css: object) {
  const componentObject: any = {};
  componentObject[`.${className}`] = css;
  return componentObject;
}

function createComponentClassAtBreakpoint(
  breakpoint: string,
  className: string,
  css: object,
) {
  const mediaQueryName = `@media screen(${breakpoint})`;
  const componentObject: any = {};
  componentObject[mediaQueryName] = {};
  componentObject[mediaQueryName][`.${className}`] = css;

  return componentObject;
}

const TypeSystemPlugin = plugin.withOptions(
  (options: TypographyBreakpointTable) => {
    return ({ addComponents }) => {
      const breakpoints = Object.entries(options);

      breakpoints.forEach(([breakpointName, typeCategories]) => {
        const typeStyle = Object.entries(typeCategories);
        typeStyle.forEach(([typeClassName, style]) => {
          const isDefaultBreakpoint = breakpointName === Breakpoints.default;
          const componentClass = isDefaultBreakpoint
            ? createComponentClass(`font-${typeClassName}`, style)
            : createComponentClassAtBreakpoint(
                breakpointName,
                `font-${typeClassName}`,
                style,
              );

          addComponents(componentClass);
        });
      });
    };
  },
);

export default TypeSystemPlugin;
