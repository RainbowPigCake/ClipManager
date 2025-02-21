import React, { useEffect, useRef, useState } from 'react';
import { convertFileSrc } from '@tauri-apps/api/core';
import ReactPlayer from 'react-player';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Play,
  Pause,
  Redo,
  Undo,
  Volume2,
  VolumeX,
  Maximize,
  Minimize
} from 'lucide-react';

export default function ClipViewer({ clipFilePath }) {
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const clipURI = convertFileSrc(decodeURI(clipFilePath));
  const fileName = decodeURI(clipFilePath).split(/[/\\]/).pop();

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setSeeking(false);
    if (playerRef.current) {
      playerRef.current.seekTo(parseFloat((e.target as HTMLInputElement).value));
    }
  };

  const handleProgress = (state: { played: number }) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleSkip = (forward: boolean) => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime + (forward ? 5 : -5));
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    console.log('Rendering Clip Viewer!');
  }, []);

  return (
    <Card className="w-full max-w-[90vw] mx-auto my-4 p-4" ref={containerRef}>
      <div className="relative group">
        <ReactPlayer
          ref={playerRef}
          url={clipURI}
          playing={playing}
          volume={volume}
          width="100%"
          height="auto"
          style={{ aspectRatio: '16/9' }}
          onProgress={handleProgress}
          progressInterval={100}
        />

        {/* Custom Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          {/* Progress Bar */}
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
            className="w-full h-1 mb-4 accent-primary"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSkip(false)}
                    >
                      <Undo className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Back 5s</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handlePlayPause}
                    >
                      {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{playing ? 'Pause' : 'Play'}</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSkip(true)}
                    >
                      <Redo className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Forward 5s</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
                >
                  {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 accent-primary"
                />
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4 text-lg font-semibold text-foreground">
        {fileName}
      </div>
    </Card>
  );
}
