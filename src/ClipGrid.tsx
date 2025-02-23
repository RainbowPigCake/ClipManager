import { useState, useRef, useEffect } from 'react';
import Clip from './Clip';
import SearchPanel from './SearchPanel';
import './ClipGrid.css';
import { invoke } from '@tauri-apps/api/core';

interface Clip {
  id: string;
  path: string;
  loadThumbnail: boolean;
}

const THUMBNAILS_PER_BATCH = 20; // Number of thumbnails to load at once

export default function ClipGrid({ handleClickClip, isVisible, clipFolderPath }: any) {
  const [clips, setClips] = useState<Clip[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  const refreshClips = async () => {
    // TODO: Remove log
    console.log('Refreshing Clips!');
    try {
      setClips([]);
      setLoadedCount(0);
      console.log(clipFolderPath)
      const paths = await invoke<string[]>('get_clip_file_paths', {
        directory: clipFolderPath,
      });

      // Initialize all clips with loadThumbnail=false
      const newClips = paths.map(path => ({
        id: crypto.randomUUID(),
        path: path,
        loadThumbnail: false
      }));

      setClips(newClips);
    } catch (err) {
      console.error(`Error refreshing clips: ${err}`);
      setClips([]);
    }
  };

  useEffect(() => {
    refreshClips();
  }, [])

  useEffect(() => {
    if (clips.length > 0 && loadedCount < clips.length) {
      const timer = setTimeout(() => {
        setClips(prevClips => {
          const nextBatch = Math.min(THUMBNAILS_PER_BATCH, clips.length - loadedCount);
          return prevClips.map((clip, index) => {
            if (index >= loadedCount && index < loadedCount + nextBatch) {
              return { ...clip, loadThumbnail: true };
            }
            return clip;
          });
        });
        setLoadedCount(prev => Math.min(prev + THUMBNAILS_PER_BATCH, clips.length));
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [clips, loadedCount]);

  return (
    <div className={`${isVisible ? 'block' : 'hidden'}`}>

      <div className="list-container">
        {clips.map((clip) => (
          <Clip
            key={clip.id}
            filePath={clip.path}
            handleClickClip={handleClickClip}
            loadThumbnail={clip.loadThumbnail}
          />
        ))}
      </div>
    </div>
  );
}
