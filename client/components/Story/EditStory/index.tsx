/* eslint-disable consistent-return */
import React, { useState } from 'react';
import Button from '@components/Button';
import Modal from '@components/Modal';
import Input from '@components/Input';
import { useForm } from 'react-hook-form';
import {
  deleteStory, fileUpload, updateStory,
} from '@http/self';
import { InputFile } from '@components/Input/inputFile';
import Divider from '@components/Divider';
import { useRouter } from 'next/router';

export default function EditStory(props: any) {
  const {
    openModalStory, setOpenModalStory, story, setStory,
  } = props;
  const [buttonLoading, setButtonLoading] = useState(false);
  const [image, setImage] = useState(story.cover);
  const [audio, setAudio] = useState('');

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: story.title,
      description: story.description,
      tags: story.tags,
    },
  });
  const onFinishForm = async (data: any) => {
    setButtonLoading(true);
    await updateStory({
      ...story,
      ...data,
      cover: image,
      audio,

    });
    setStory({
      ...story,
      ...data,
      cover: image,
      audio,

    });
    setButtonLoading(false);
    setOpenModalStory(false);
  };
  const removeStory = async () => {
    await deleteStory(story.id);
    router.push('/builder');
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
      <img className="absolute w-full h-full opacity-30 -z-10" src={image} alt="bg-story" />
      )}
      <form
        className="w-full p-10"
        onSubmit={handleSubmit(onFinishForm)}
      >
        <div className="flex flex-col w-full my-5">
          <p>
            Title:
          </p>
          <Input
            register={register}
            name="title"
            placeholder="Title of your story"
            required
            error={errors.title ? 'Title is required' : ''}
          />
        </div>

        <div className="flex flex-col w-full my-5">
          <p>
            Description:
          </p>
          <Input
            type="textarea"
            register={register}
            name="description"
            placeholder="the description of your story"
            required
            error={errors.description ? 'description is required' : ''}
          />
        </div>

        <div className="flex flex-col w-full my-5">
          <p>
            Add tags:
          </p>
          <Input
            register={register}
            name="tags"
            placeholder="Tags must be separated by commas"
            required
            error={errors.title ? 'Title is required' : ''}
          />
        </div>
        <div className="flex flex-col w-full mb-5">
          <p>
            Upload an audio file as a music theme:
          </p>
          <InputFile
            loading={buttonLoading}
            label="Upload audio"
            onChange={async (formData) => {
              setButtonLoading(true);
              const data = await fileUpload(formData);
              setButtonLoading(false);
              setAudio(data.url);
            }}
            allowMultipleFiles={false}
            uploadFileName="bg-image"
            className="w-2/6"
          />
        </div>
        <div className="flex flex-col w-full my-5">
          <p>
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
        <Divider />
        <div className="flex flex-row items-center justify-between w-full  py-2 mt-3">
          <Button
            loading={buttonLoading}
            type="danger"
            onClick={removeStory}
            label="Remove story"
            size="medium"
          />

          <Button
            loading={buttonLoading}
            type="primary"
            htmlType="submit"
            label="Update story"
            size="medium"
          />
        </div>
      </form>
    </Modal>
  );
}
