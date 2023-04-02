/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';

interface Props {
  children: any;
  className: string;
  onClick: () => void;
  audioUrl?: string;
}

export default function Answer(props: Props) {
  const {
    children, className, onClick, audioUrl,
  } = props;

  return (
    <div
      onClick={onClick}
      className={`${className} rounded-lg border-[#eaeaea] border-2 p-2 m-2  hover:border-[#0070f3] flex flex-col items-center justify-start cursor-pointer  ${
        audioUrl ? 'pb-20' : ''
      }`}
    >
      {audioUrl && (
        <div className="h-[100px] fixed -bottom-5">
          <audio controls controlsList="nodownload noplaybackrate">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {children}
    </div>
  );
}
