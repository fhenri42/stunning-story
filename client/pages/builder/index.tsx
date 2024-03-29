import React, { useState } from 'react';
import Button from '@components/Button';
import { getToken } from 'next-auth/jwt';
import Header from '@components/Header';
import Link from 'next/link';
import qs from 'qs';
import StroyCard from '@components/StoryCard';
import { isMobile } from 'react-device-detect';
import getConfig from 'next/config';
import { fetchMe } from '@lib/me';
import NewStory from '@components/Story/NewStory';
import useTranslation from 'next-translate/useTranslation';
import Footer from '@components/Footer';

const { serverRuntimeConfig } = getConfig();
export default function Builder(props: any) {
  const { stories } = props;
  const { t } = useTranslation('common');
  const [openModalStory, setOpenModalStory] = useState(false);

  return (
    <div className="bg-[#212121]">
      <Header />
      <div className="flex flex-row items-center justify-center mx-20 mt-10">
        <h1 className="text-3xl text-center">{t('builder.title')}</h1>

        {!isMobile && (
          <div className="ml-auto flex flex-row items-center justify-center">
            <Button
              onClick={() => setOpenModalStory(true)}
              label={t('builder.button_create_story')}
            />
            <Link type="link" href="/doc" className="ml-5">
              {t('header.doc')}
            </Link>
          </div>
        )}
      </div>

      <div className="relative mt-14 px-6 lg:px-8 lg:mx-16 min-h-screen">
        <div className="absolute inset-0">
          <div className="h-1/3  sm:h-2/3" />
        </div>
        <div className="max-w-8xl">
          <div className="grid  mx-auto max-w-lg gap-5 lg:max-w-none lg:grid-cols-4">
            {stories?.length > 0
              && stories.map((story: any) => (
                <Link key={story.slug} href={`/builder/${story.slug}`}>
                  <StroyCard story={story} />
                </Link>
              ))}
          </div>
        </div>
        {stories?.length === 0 && (
          <h1 className="text-2xl text-gray-400">{t('builder.no_story')}</h1>
        )}
      </div>
      <NewStory
        openModalStory={openModalStory}
        setOpenModalStory={setOpenModalStory}
      />
      <Footer />
    </div>
  );
}

Builder.auth = true;
export async function getServerSideProps({ req }: any) {
  try {
    const session: any = await getToken({ req, secret: serverRuntimeConfig.SECRET });
    const cmsQuery = qs.stringify(
      {
        populate: [
          'stories',
          'stories.cover',
          'stories.slug',
        ],
      },
      {
        encodeValuesOnly: true,
      },
    );
    const me: any = await fetchMe(
      `/api/users/me??${cmsQuery}`,
      'GET',
      session.jwt,
    );
    me.stories = me.stories.map((story: any) => ({
      ...story,
      author: {
        data: {
          attributes: {
            username: me.username,
            image: me.image,
          },
        },
      },
    }));
    console.log(me);
    return {
      props: {
        stories: me.stories || [],
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
