import { useState, useRef, useEffect } from 'react';
import Clip from './Clip';
import SearchBar from './SearchBar';
import './index.css';
import './ClipGrid.css';
import { invoke } from '@tauri-apps/api';

interface Clip {
  id: string;
  path: string;
  loadThumbnail: boolean;
}

const THUMBNAILS_PER_BATCH = 100; // Number of thumbnails to load at once

export default function ClipGrid({ handleClickClip, isVisible }) {
  const [clips, setClips] = useState<Clip[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const clipGridRef = useRef(null);

  const refreshClips = async (dir: string) => {
    console.log('Refreshing Clips!');
    try {
      setClips([]);
      setLoadedCount(0);

      const paths = await invoke<string[]>('get_clip_file_paths', {
        directory: dir,
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

  // Progressive loading effect
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
      }, 100); // Small delay between batches

      return () => clearTimeout(timer);
    }
  }, [clips, loadedCount]);

  return (
    <div className={`${isVisible ? 'block' : 'hidden'}`} ref={clipGridRef}>
      <SearchBar onRefresh={refreshClips} />
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
