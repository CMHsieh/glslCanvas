import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

type VideoProps = {
  src: string;
  width?: string | number;
  height?: string | number;
  maxWidth?: string | number;
  align?: "left" | "center" | "right";
  caption?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

// 輔助函式：從 URL 提取 YouTube ID
function getYouTubeId(url: string) {
  // 新增 shorts/ 到匹配規則
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function VideoPlayer({
  src,
  width = "100%",
  height = "auto",
  maxWidth,
  align = "center",
  caption,
  autoplay = false,
  loop = false,
  muted = false,
  controls = true,
  className,
  style,
}: VideoProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  let margin = "1.5rem auto";
  if (align === "left") {
    margin = "1.5rem auto 1.5rem 0";
  } else if (align === "right") {
    margin = "1.5rem 0 1.5rem auto";
  }

  const containerStyle: React.CSSProperties = {
    maxWidth: maxWidth || "100%",
    width: width,
    margin,
    display: "block",
    ...style,
  };

  const visualStyle: React.CSSProperties = {
    borderRadius: "0.5rem",
    border: "1px solid #eee",
    overflow: "hidden",
    position: "relative",
  };

  // Check if the source is a file that can be played natively
  const isNativeVideo = !src.startsWith('http') || src.split('?')[0].match(/\.(mp4|webm|ogg|mov)$/i);

  let playerContent;
  let isEmbed = false;

  if (isNativeVideo) {
    playerContent = (
      <video
        src={src}
        width="100%"
        height="100%"
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    );
  } else {
    isEmbed = true;
    if (!hasMounted) {
      playerContent = null;
    } else {
      const youtubeId = getYouTubeId(src);
      if (youtubeId) {
        playerContent = (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${autoplay ? 1 : 0}&loop=${loop ? 1 : 0}&playlist=${loop ? youtubeId : ''}&controls=${controls ? 1 : 0}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          />
        );
      } else {
        playerContent = (
          <ReactPlayer
            url={src}
            width="100%"
            height="100%"
            playing={autoplay}
            loop={loop}
            muted={muted}
            controls={controls}
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        );
      }
    }
  }

  const wrapperStyle: React.CSSProperties = isEmbed
    ? { ...containerStyle, ...visualStyle, aspectRatio: "16/9", height: undefined }
    : { ...containerStyle, ...visualStyle };

  if (caption) {
    const innerDivStyle: React.CSSProperties = isEmbed
      ? { ...visualStyle, aspectRatio: "16/9", width: "100%" }
      : { ...visualStyle };

    return (
      <figure style={{ ...containerStyle, aspectRatio: undefined, maxWidth: maxWidth || "100%" }}>
        <div style={innerDivStyle}>
             {playerContent}
        </div>
        <figcaption>{caption}</figcaption>
      </figure>
    );
  }

  return (
    <div className={`video-player-wrapper ${className || ""}`} style={wrapperStyle}>
      {playerContent}
    </div>
  );
}
