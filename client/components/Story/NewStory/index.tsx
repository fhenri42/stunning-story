/* eslint-disable consistent-return */
import React, { useState } from 'react';
import Button from '@components/Button';
import Modal from '@components/Modal';
import Input from '@components/Input';
import { useForm } from 'react-hook-form';
import { createStory, fileUpload } from '@http/self';
import { InputFile } from '@components/Input/inputFile';
import Divider from '@components/Divider';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

export default function NewStory(props: any) {
  const {
    openModalStory, setOpenModalStory,
  } = props;
  const { t } = useTranslation('common');

  const [buttonLoading, setButtonLoading] = useState(false);
  const [image, setImage] = useState('');
  const [audio, setAudio] = useState('');

  const router = useRouter();

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
      storyGraph: [],
      cover: image,
      audio,
    });
    router.push(`/builder/${res.attributes.slug}`);
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
      onCancel={() => {
        setOpenModalStory(false);
      }}
    >
      {image !== '' && (
        <img
          className="absolute w-full h-full opacity-30 -z-10"
          src={image}
          alt="bg-story"
        />
      )}
      <form className="w-full p-10" onSubmit={handleSubmit(onFinishForm)}>
        <div className="flex flex-col w-full my-5">
          <p>{t('builder.edit_save_story.title')}</p>
          <Input
            register={register}
            name="title"
            placeholder={t('builder.edit_save_story.placeholder_title')}
            required
            error={
              errors.title ? t('builder.edit_save_story.title_required') : ''
            }
          />
        </div>

        <div className="flex flex-col w-full my-5">
          <p>{t('builder.edit_save_story.description')}</p>
          <Input
            type="textarea"
            register={register}
            name="description"
            placeholder={t('builder.edit_save_story.placeholder_description')}
            required
            error={
              errors.description
                ? t('builder.edit_save_story.description_required')
                : ''
            }
          />
        </div>

        <div className="flex flex-col w-full my-5">
          <p>{t('builder.edit_save_story.tags')}</p>
          <Input
            register={register}
            name="tags"
            placeholder={t('builder.edit_save_story.placeholder_tags')}
            required
            error={
              errors.title ? t('builder.edit_save_story.tags_required') : ''
            }
          />
        </div>
        <div className="flex flex-col w-full mb-5">
          <p>{t('builder.edit_save_story.audio')}</p>
          <InputFile
            loading={buttonLoading}
            label={t('builder.edit_save_story.audio_button')}
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
          <p>{t('builder.edit_save_story.cover')}</p>
          <InputFile
            loading={buttonLoading}
            label={t('builder.edit_save_story.cover_button')}
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
          <div />
          <Button
            loading={buttonLoading}
            type="primary"
            htmlType="submit"
            label={t('builder.edit_save_story.create')}
            size="medium"
          />
        </div>
      </form>
    </Modal>
  );
}
