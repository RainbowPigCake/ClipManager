import React, { useState } from 'react';
import './index.css';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

const maxStrLengthTitle = 31;

export default function Clip({ filePath, handleClickClip }) {
  const parsedPath = filePath.split(/[/\\]/).pop();

  return (
    <Card
      className="m-4 cursor-pointer"
      onClick={() => handleClickClip(filePath)}
    >
      <CardHeader>
        <img
          className="rounded-md object-scale-down w-[276px] h-[155px] mb-1"
          src="https://media.discordapp.net/attachments/1279640411236991090/1280609307070697564/IMG_20240903_142316.jpg?ex=66d8b3db&is=66d7625b&hm=3afc5dc77bf6957a0a5164a9e3889ed208dc16641457003458d999d0e7cf611e&=&format=webp&width=507&height=676"
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
