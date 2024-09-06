import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import Clip from './Clip';
import SearchBar from './SearchBar';
import Record from './Record';
import './index.css';
import './ClipGrid.css';
import { invoke } from '@tauri-apps/api';

export default function ClipGrid({ handleClickClip, isVisible }) {
  const [clips, setClips] = useState([]);
  const clipGridRef = useRef(null);

  const refreshClips = (dir) => {
    console.log('Refreshing Clips!');
    invoke('get_clip_file_paths', {
      directory: dir,
    })
      .then((res) => {
        setClips([]);
        res.forEach((path) => {
          setClips((prevClips) => {
            return [...prevClips, { id: crypto.randomUUID(), path: path }];
          });
        });
      })
      .catch((err) => {
        console.log(`${err}`);
        setClips([]);
      });
  };

  return (
    <>
      <div className={`${isVisible ? 'block' : 'hidden'}`} ref={clipGridRef}>
        <div className="topPanel">
          <SearchBar onRefresh={refreshClips} />
          <Record />
        </div>
        <div className="list-container">
          {clips.map((clip) => (
            <Clip
              key={clip.id}
              filePath={clip.path}
              handleClickClip={handleClickClip}
            />
          ))}
        </div>
      </div>
    </>
  );
}
