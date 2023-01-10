/* eslint-disable consistent-return */
import React, { useState } from 'react';
import Button from '@components/Button';
import { v4 as uuidv4 } from 'uuid';
import Modal from '@components/Modal';
import Input from '@components/Input';
import Divider from '@components/Divider';
import { useForm } from 'react-hook-form';
import { TrashIcon } from '@heroicons/react/24/solid';
import { createStory, fileUpload, updateStory } from '@http/self';
import Switch from '@components/Switch';
import { InputFile } from '@components/Input/inputFile';

export default function NewStory(props: any) {
  const {
    openModalStory, setOpenModalStory, story, setStory,
  } = props;
  const [buttonLoading, setButtonLoading] = useState(false);
  const [image, setImage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });
  const onFinishForm = async (data: any) => {
    setButtonLoading(true);
    const res = await createStory({
      ...data,
      cover: image,
    });
    router.push(`builder/${res.attributes.slug}`);
    setButtonLoading(false);
    setOpenModalStory(false);
  };
  return (
    <Modal
      visible={openModalStory}
      bodyStyle={{
        backgroundColor: '#1B263B',
        width: '100%',
        position: 'relative',
        padding: '0',
      }}
      onCancel={() => { setOpenModalStory(false); }}
    >
      {image !== '' && (
      <img className="absolute w-full h-full opacity-30 -z-10" src={image} alt="bg-image" />
      )}
      <form
        className="w-full p-10"
        onSubmit={handleSubmit(onFinishForm)}
      >
        <Input
          register={register}
          name="title"
          placeholder="Title"
          required
          error={errors.title ? 'Title is required' : ''}
        />
        <Input
          type="textarea"
          register={register}
          name="description"
          placeholder="the description of your story"
          required
          error={errors.password ? 'description is required' : ''}
        />
        <Input
          register={register}
          name="tags"
          placeholder="Add tags separated by commas"
          required
          error={errors.title ? 'Title is required' : ''}
        />
        <div className="flex flex-row w-full items-start justify-between p-5">
          <p className="w-4/6">
            Upload the Cover of your story:
          </p>
          <InputFile
            loading={buttonLoading}
            label="Upload image"
            onChange={async (formData) => {
              setButtonLoading(true);
              const data = await fileUpload(formData);
              setButtonLoading(false);

              setImage(data.url);
            }}
            allowMultipleFiles={false}
            uploadFileName="bg-image"
            className="w-2/6"
          />
        </div>
        <div className="flex flex-col">
          <div className="py-2 mt-3">
            <Button
              loading={buttonLoading}
              type="primary"
              htmlType="submit"
              label="Create story"
              size="medium"
            />
          </div>
        </div>
      </form>

    </Modal>
  );
}
