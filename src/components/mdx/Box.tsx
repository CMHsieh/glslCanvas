import React from "react";

type BoxProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: keyof JSX.IntrinsicElements;
  width?: string | number;
  flex?: string | number;
};

export default function Box({
  as: Component = "div",
  children,
  className,
  style,
  width,
  flex,
  ...rest
}: BoxProps) {
  return (
    <Component
      className={className}
      style={{
        width,
        flex,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}