import React, { useEffect } from "react";
import { appDataDir, join } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import ReactPlayer from "react-player";

export default function ClipViewer({ onBack, clipFilePath }) {
  const clipURI = convertFileSrc(decodeURI(clipFilePath));

  useEffect(() => {
    console.log("Rendering Clip Viewer!");
  }, []);
  return (
    <>
      <div>
        <button onClick={onBack}>← Back</button>
        <div>{decodeURI(clipFilePath)}</div>
        <ReactPlayer
          playing
          url={[{ src: clipURI, type: "video/mp4" }]}
          width={1120}
          height={630}
          controls
        />
      </div>
    </>
  );
}
