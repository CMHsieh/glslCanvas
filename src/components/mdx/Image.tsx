import React from "react";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  maxWidth?: string | number;
  align?: "left" | "center" | "right";
  caption?: string;
};

export default function Image({
  src,
  alt,
  width,
  height,
  maxWidth,
  align = "center",
  caption,
  style,
  className,
  ...rest
}: ImageProps) {
  let margin = "1.5rem auto";
  if (align === "left") {
    margin = "1.5rem auto 1.5rem 0";
  } else if (align === "right") {
    margin = "1.5rem 0 1.5rem auto";
  }

  const baseImageStyle: React.CSSProperties = {
    width: width || "100%",
    height: height || "auto",
    borderRadius: "0.5rem",
    border: "1px solid #eee",
    display: "block",
    ...style,
  };

  if (caption) {
    const figureStyle: React.CSSProperties = {
      maxWidth: maxWidth || "100%",
      margin,
      display: "block",
    };

    return (
      <figure style={figureStyle}>
        <img
          src={src}
          alt={alt}
          style={baseImageStyle}
          className={className}
          {...rest}
        />
        <figcaption>{caption}</figcaption>
      </figure>
    );
  }

  const imageStyle: React.CSSProperties = {
    ...baseImageStyle,
    maxWidth: maxWidth || "100%",
    margin,
  };

  return (
    <img
      src={src}
      alt={alt}
      style={imageStyle}
      className={className}
      {...rest}
    />
  );
}
