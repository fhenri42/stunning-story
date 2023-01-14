import { SpeakerWaveIcon } from '@heroicons/react/24/solid';
import React from 'react';

interface Props {
  children: any;
  text: string;
  className: string;
  audioUrl: string;
}

export default function Question(props: Props) {
  const {
    text,
    children,
    className,
    audioUrl,
  } = props;

  return (
    <div className={` ${className} rounded-lg border-[#eaeaea] border-2 p-8 bg-black bg-opacity-60 relative`}>
      {audioUrl && (

      <SpeakerWaveIcon
        onClick={() => {
          const audio = new Audio(audioUrl);
          audio.play();
        }}
        className="h-7 w-7 absolute top-2 right-4"
      />
      )}

      {children}
    </div>
  );
}
