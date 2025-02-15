import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

const maxStrLengthTitle = 31;

export default function Clip({ filePath, handleClickClip, loadThumbnail }) {
  const [thumbnailPath, setThumbnailPath] = useState<string | null>(null);
  const parsedPath = filePath.split(/[/\\]/).pop();

  useEffect(() => {
    if (loadThumbnail) {
      invoke('get_thumbnail', {
        videoPath: filePath
      })
        .then((thumbPath: string) => {
          setThumbnailPath(convertFileSrc(thumbPath));
        })
        .catch(console.error);
    }
  }, [filePath, loadThumbnail]);

  return (
    <Card
      className="m-4 cursor-pointer"
      onClick={() => handleClickClip(filePath)}
    >
      <CardHeader>
        <img
          className="rounded-md object-scale-down w-[276px] h-[155px] mb-1"
          // TODO: change fallback thumbnail
          src={thumbnailPath ?? "https://static.wikia.nocookie.net/silly-cat/images/7/78/Melon_Cat_Species_2.png"}
          alt={parsedPath}
        />
      </CardHeader>
      <CardContent>
        <CardTitle>
          {parsedPath.length > maxStrLengthTitle
            ? parsedPath.slice(0, maxStrLengthTitle - 3) + '...'
            : parsedPath}
        </CardTitle>
      </CardContent>
    </Card>
  );
}
