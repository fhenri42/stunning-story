import React, { useEffect, useState } from 'react';
import Button from '@components/Button';
import { signIn, useSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
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
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@api/auth/[...nextauth]';

import getConfig from 'next/config';
import { fetchMe } from '@lib/me';

const { serverRuntimeConfig } = getConfig();
export default function Builder(props: any) {
  const { stories } = props;
  const { data: session, status } = useSession();
  console.log('session', stories);

  const [openModalStory, setOpenModalStory] = useState(false);
  const [image, setImage] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const router = useRouter();

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
            className="w-1/4 m-5"
            key={story.slug}
            href={`/builder/${story.slug}`}
          >
            <StroyCard story={story} />

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
    </div>
  );
}
Builder.auth = true;
export async function getServerSideProps({ query, req, res }) {
  try {
    const session = await getToken({ req, secret: serverRuntimeConfig.SECRET });
    const cmsQuery = qs.stringify(
      {

        populate: [
          'stories',
          'stories.cover',
          'stories.slug',
          'stories.author',

        ],
      },
      {
        encodeValuesOnly: true,
      },
    );
    const me = await fetchMe(`/api/users/me??${cmsQuery}`, 'GET', session.jwt);
    console.log('me', me);
    return {
      props: {
        stories: me.stories,
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
