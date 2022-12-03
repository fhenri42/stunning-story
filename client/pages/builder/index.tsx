import React, { useEffect, useState } from 'react';
import Button from '@components/Button';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';

import { createStory } from '@http/self';
import Modal from '@components/Modal';
import Input from '@components/Input';
import { useRouter } from 'next/router';

const MyDiagram = dynamic(() => import('@components/Diagram'), {
  ssr: false,
});

export default function Builder() {
  const [openModalStory, setOpenModalStory] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const router = useRouter();

  const onFinishForm = async (data) => {
    setButtonLoading(true);
    console.log(data);
    const res = await createStory(data);
    console.log('Res =>', res);
    router.push(`builder/${res.slug}`);
    setButtonLoading(false);
    setOpenModalStory(false);
  };
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
  return (
    <div className="h-screen w-screen overflow-auto">

      <Modal
        visible={openModalStory}
        closable={false}
        bodyStyle={{
          backgroundColor: '#1B263B',
        }}
        title="create your story"
        onCancel={() => {}}
      >
        <form
          className="w-4/5 sm:space-y-3 md:space-y-5 text-white"
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
            register={register}
            name="description"
            placeholder="the description of your story"
            required
            error={errors.password ? 'description is required' : ''}
          />
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
    </div>
  );
}
