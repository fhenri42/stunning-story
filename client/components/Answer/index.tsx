import React from 'react';

interface Props {
  children: any;
  className: string;
  onClick: () => void;
}

export default function Answer(props: Props) {
  const {
    children,
    className,
    onClick,
  } = props;

  return (
    <div onClick={onClick} className={` ${className} rounded-lg border-[#eaeaea] border-2 p-2 m-2 hover:border-[#0070f3] hover:text-[#0070f3] flex flex-row items-center justify-center cursor-pointer`}>
      {children}
    </div>
  );
}
