import { SpeakerXMarkIcon } from '@heroicons/react/24/outline';
import { SpeakerWaveIcon } from '@heroicons/react/24/solid';
import React, { useEffect } from 'react';

interface Props {
  children: any;
  className: string;
  audioUrl: string;
}
const audio = new Audio();

export default function Question(props: Props) {
  const {
    children,
    className,
    audioUrl,
  } = props;

  useEffect(() => {
    audio.src = audioUrl;
    return () => {
      audio.pause();
    };
  }, []);
  const [isPlaying, setIsPlaying] = React.useState(false);
  return (
    <div className={` ${className} rounded-lg border-[#eaeaea] border-2 p-8 bg-black bg-opacity-60 relative`}>
      {audioUrl && isPlaying && (
        <SpeakerWaveIcon
          onClick={() => {
            setIsPlaying(!isPlaying);
            audio.pause();
          }}
          className="h-7 w-7 absolute top-2 right-4  bg-blue-500 rounded-full p-1 z-50"
        />
      )}
      {audioUrl && !isPlaying && (
      <SpeakerXMarkIcon
        onClick={() => {
          setIsPlaying(!isPlaying);
          audio.play();
        }}
        className="h-7 w-7 absolute top-2 right-4  bg-blue-500 rounded-full p-1 z-50"
      />
      )}

      {children}
    </div>
  );
}
