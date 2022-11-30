/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

interface InputProps {
  type?: string;
  label?: string;
  name?: string;
  help?: string;
  error?: string;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  placeholder?: string;
  defaultValue?: string;
  id?: string;
  register?: any;
  required?: boolean;
  className?: string;
  textColor?: string;
}

const colors = {
  base: 'shadow-sm focus:border-[#f80] focus:ring-[#f80]',
  error:
    'border-red-300 focus:ring-red-500 text-red-900 placeholder-red-300 focus:border-red-500',
};
export default function Input(props: InputProps) {
  const {
    label,
    help,
    error,
    type,
    placeholder,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    id,
    name,
    register = () => {},
    required,
    className,
    textColor = 'text-white',
  } = props;
  const [customType, setCustomType] = useState(type);

  return (
    <div className={className}>
      <label htmlFor={type} className="block text-sm font-medium text-white">
        {label}
      </label>
      <div className="w-full relative mt-1 rounded-md shadow-sm">
        <input
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          type={customType ?? type ?? 'text'}
          name={name}
          id={id}
          className={`
          ${textColor}
          ${
            error ? colors.error : colors.base
          } block  w-full bg-transparent rounded-md border-[#bcbfbb] shadow-sm sm:text-sm`}
          placeholder={placeholder}
          defaultValue={defaultValue}
          aria-describedby="email-error"
          {...register(name, { required })}
        />
        {customType === 'password' && (
          <div
            onClick={() => {
              setCustomType('text');
            }}
            className={`${textColor} absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer`}
          >
            <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
          </div>
        )}
        {customType === 'text' && (
          <div
            onClick={() => {
              setCustomType('password');
            }}
            className={`${textColor} absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer`}
          >
            <EyeIcon className="h-5 w-5" aria-hidden="true" />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error}
        </p>
      )}
    </div>
  );
}
