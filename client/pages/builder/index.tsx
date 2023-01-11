import React, { useState } from 'react';
import Button from '@components/Button';
import { getToken } from 'next-auth/jwt';
import Header from '@components/Header';
import Link from 'next/link';
import qs from 'qs';
import StroyCard from '@components/StoryCard';

import getConfig from 'next/config';
import { fetchMe } from '@lib/me';
import NewStory from '@components/Story/NewStory';

const { serverRuntimeConfig } = getConfig();
export default function Builder(props: any) {
  const { stories } = props;

  const [openModalStory, setOpenModalStory] = useState(false);

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
      <NewStory
        openModalStory={openModalStory}
        setOpenModalStory={setOpenModalStory}
      />
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
          'stories.author',

        ],
      },
      {
        encodeValuesOnly: true,
      },
    );
    const me: any = await fetchMe(`/api/users/me??${cmsQuery}`, 'GET', session.jwt);
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
