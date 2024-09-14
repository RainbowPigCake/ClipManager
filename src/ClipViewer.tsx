import React, { useEffect } from 'react';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import ReactPlayer from 'react-player';

export default function ClipViewer({ clipFilePath }) {
  const clipURI = convertFileSrc(decodeURI(clipFilePath));

  useEffect(() => {
    console.log('Rendering Clip Viewer!');
  }, []);
  return (
    <>
      <div>
        <div>{decodeURI(clipFilePath)}</div>
        <ReactPlayer
          playing
          url={[{ src: clipURI, type: 'video/mp4' }]}
          width={1120}
          height={630}
          controls
        />
      </div>
    </>
  );
}
