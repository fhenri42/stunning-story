import React from 'react';

interface IDivider {
  className?: string;
  type?: 'horizontal' | 'vertical';
  orientation?: 'left' | 'right' | 'center';
  children?: any;
}

export default function Divider(props: IDivider) {
  const {
    className = 'border-gray-200',
    type = 'horizontal',
    orientation = 'center',
    children,
  } = props;

  const getOrientation = () => {
    if (orientation === 'left') return 'justify-start';
    if (orientation === 'right') return 'justify-end';
    return 'justify-center';
  };

  if (type === 'horizontal') {
    return (
      <div className="relative w-full p-1">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className={`w-1/2 border-t ${className}`} />
          <div className={`relative flex ${getOrientation()}`}>
            {children && (
            <span className="text-lg mx-5 font-medium text-white">
              {children}
            </span>
            )}
          </div>
          <div className={`w-1/2 border-t ${className}`} />
        </div>
      </div>
    );
  }
  return <div className={`mx-2 border-r ${className}`} />;
}
