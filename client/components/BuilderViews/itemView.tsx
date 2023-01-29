import React, { useState } from 'react';
import Input from '@components/Input';

import Modal from '@components/Modal';
import Button from '@components/Button';
import useTranslation from 'next-translate/useTranslation';
import { useForm } from 'react-hook-form';
import Divider from '@components/Divider';
import { InputFile } from '@components/Input/inputFile';
import { fileUpload } from '@http/self';
import Select from '@components/Select';

export default function ItemView(props: any) {
  const { t } = useTranslation('common');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [newItemOpen, setNewItemOpen] = useState(false);
  const [image, setImage] = useState(false);

  const {
    openView, setOpenView,
  } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createItem = async (data: any) => {
    console.log(data);
  };

  return (
    <Modal
      bodyStyle={{
        backgroundColor: '#1B263B',
        height: '60vh',
      }}
      visible={openView}
      onCancel={() => {
        setOpenView(false);
      }}
    >
      <div className="flex flex-col items-start w-full">
        <div className="flex flex-row items-start justify-between w-full">
          <h1 className="text-2xl">Your items</h1>
          <Button
            onClick={() => {
              setNewItemOpen(true);
            }}
            label="New item"
          />
        </div>
        <Divider />
      </div>
      <Modal
        bodyStyle={{
          padding: 0,
          backgroundColor: '#1B263B',
        }}
        visible={newItemOpen}
        onCancel={() => {
          setNewItemOpen(false);
        }}
      >
        <form
          className="flex flex-col items-center justify-center w-full p-5"
          onSubmit={handleSubmit(createItem)}
        >
          <h1 className="text-2xl">New item</h1>

          <div className="flex flex-col w-full my-5">
            <p>{t('builder.item_view.name')}</p>
            <Input
              className="w-full"
              register={register}
              name="name"
              placeholder={t('builder.item_view.name_placeholder')}
              required
              error={errors.name ? t('builder.item_view.name_required') : ''}
            />
            <p className="pt-3">{t('builder.item_view.description')}</p>
            <Input
              className="w-full"
              register={register}
              name="description"
              placeholder={t('builder.item_view.description_placeholder')}
              required={false}
            />
            <p className="pt-3">{t('builder.item_view.dmg')}</p>
            <div className="flex flex-row items-center">
              <div className="w-1/3">
                <Select />
              </div>

              <Input
                className="w-full"
                register={register}
                name="description"
                placeholder={t('builder.item_view.dmg_placeholder')}
                required={false}
              />
            </div>
            <p className="pt-3">{t('builder.item_view.image')}</p>
            <InputFile
              loading={buttonLoading}
              label={t('builder.edit_save_node.upload_image_button')}
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

          <div className="py-2 mt-3 flex flex-row items-center justify-between w-full">
            <Button
              loading={buttonLoading}
              type="primary"
              htmlType="submit"
              label={t('builder.item_view.create')}
              size="medium"
            />
          </div>
        </form>
      </Modal>
    </Modal>
  );
}
