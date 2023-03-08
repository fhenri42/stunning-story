/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/prefer-default-export */
import React from 'react';

interface Props {
  icon?: any;
  label: string | React.ReactNode;
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  background?: string;
  count?: number;
  disabled?: boolean;
  size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
  type?: 'primary' | 'secondary' | 'danger' | 'danger-secondary' | 'link';
  htmlType?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  className?: string;
  id?: string;
  ref?: any;
  target?: string;
  labelColor?: string;
}

export default function Button(props: Props) {
  const {
    icon = null,
    ref = null,
    label = 'button',
    onClick,
    background = 'bg-blue-600',
    count = 0,
    disabled = false,
    size = 'medium',
    loading = false,
    type = 'primary',
    htmlType = 'button',
    className = 'string',
    id = '',
    target = '',
    labelColor = 'text-white',
  } = props;

  const sizes = [
    { name: 'extra-small', style: 'px-1 py-0 text-[10px]' },
    { name: 'small', style: 'px-3 py-2 text-sm' },
    { name: 'medium', style: 'px-6 py-3 text-base' },
    { name: 'large', style: 'px-8 py-4 text-xl' },
    { name: 'extra-large', style: 'px-16 py-8 text-3xl' },
  ];

  const types = [
    {
      name: 'primary',
      style: `${background}  border-transparent ${labelColor}`,
    },
    { name: 'secondary', style: 'bg-white border-blue-400 text-blue-500' },
    {
      name: 'danger',
      style: `text-white bg-red-500 ${
        !disabled ? 'hover:bg-red-700' : ''
      }  border-transparent`,
    },
    {
      name: 'danger-secondary',
      style: 'bg-white border-red-400 text-red-500',
    },
  ];

  const indexSize = sizes.findIndex((item) => item.name === size) || 0;
  const indexType = types.findIndex((item) => item.name === type) || 0;

  if (type === 'link') {
    return (
      <a
        href="href"
        target={target}
        className={`${className} cursor-pointer underline prevent-select`}
      >
        {label}
      </a>
    );
  }
  return (
    <button
      ref={ref}
      // eslint-disable-next-line react/button-has-type
      type={htmlType}
      id={id}
      // data-testid="data-testid"
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
      style={{
        background,
      }}
      disabled={disabled}
      className={`${className} hover:bg-blue-700 font-semibold border-solid relative inline-flex items-center justify-center ${
        sizes[indexSize].style
      } ${
        types[indexType].style
      } border  shadow-sm leading-4 font-medium rounded-md ${
        !disabled
          ? 'cursor-pointer text-white'
          : 'text-gray-500 cursor-not-allowed hover:null bg-gray-100'
      }`}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <>{icon !== null && icon}</>
      )}
      {label}
      {count > 0 && (
        <span className="absolute -top-3 -right-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
          {count}
        </span>
      )}
    </button>
  );
}
