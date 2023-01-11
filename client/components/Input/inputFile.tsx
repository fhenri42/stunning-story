/* eslint-disable no-unused-vars */
import Button from '@components/Button';
import React, { useRef } from 'react';

export interface IProps {
    className: string;
    acceptedFileTypes?: string;
    allowMultipleFiles?: boolean;
    label: string;
    onChange: (formData: FormData) => void;
    uploadFileName: string;
    loading?: boolean;
  }

export function InputFile(props: IProps) {
  const {
    loading,
    className, onChange, uploadFileName, label, acceptedFileTypes, allowMultipleFiles,
  } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    const formData = new FormData();

    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file);
    });

    onChange(formData);

    formRef.current?.reset();
  };

  return (
    <>
      <Button
        className={className}
        label={label}
        onClick={onClickHandler}
        loading={loading}
      />
      <input
        accept={acceptedFileTypes}
        multiple={allowMultipleFiles}
        name={uploadFileName}
        onChange={onChangeHandler}
        ref={fileInputRef}
        style={{ display: 'none' }}
        type="file"
      />
    </>
  );
}
