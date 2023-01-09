import React, { useEffect, useState } from 'react';
import Button from '@components/Button';
import { useForm } from 'react-hook-form';
import Header from '@components/Header';
import { fetchCMS } from '@lib/cms';
import Link from 'next/link';
import qs from 'qs';

import { createStory, fileUpload } from '@http/self';
import Modal from '@components/Modal';
import Input from '@components/Input';
import { useRouter } from 'next/router';
import StroyCard from '@components/StoryCard';
import { InputFile } from '@components/Input/inputFile';

export default function Builder(props: any) {
  const { stories } = props;

  const [openModalStory, setOpenModalStory] = useState(false);
  const [image, setImage] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const router = useRouter();
  console.log('stories =>', stories);

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
    <div className="bg-[#212121]">
      <Header />
      <div className="flex flex-row items-center justify-between mx-20 mt-10">
        <h1 className="text-3xl">List of all your stories</h1>
        <Button onClick={() => setOpenModalStory(true)} label="Create a new story" />

      </div>
      <div className="flex flex-row items-center justify-start flex-wrap p-20">
        {stories?.length > 0 && stories.map((story: any) => (
          <Link
            key={story.attributes.slug}
            href={`/builder/${story.attributes.slug}`}
          >
            <StroyCard story={story.attributes} />

          </Link>
        ))}

      </div>
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
          className="w-4/5 p-10"
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
    </div>
  );
}
export async function getServerSideProps({ query }) {
  try {
    const cmsQuery = qs.stringify(
      {
        filters: {
          slug: {
            $eq: query.slug,
          },
        },
        populate: [
          'cover',
          'slug',

        ],
      },
      {
        encodeValuesOnly: true,
      },
    );
    const stories = await fetchCMS(`/api/stories?${cmsQuery}`);

    return {
      props: {
        stories,
      },
    };
  } catch (error) {
    return {
      props: {
        stories: [],
      },
    };
  }
}
