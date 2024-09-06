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
          src="https://static.wikia.nocookie.net/silly-cat/images/7/78/Melon_Cat_Species_2.png" />
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
