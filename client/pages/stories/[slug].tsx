import React from 'react';
import qs from 'qs';
import { fetchCMS } from '@lib/cms';
import dynamic from 'next/dynamic';

const Reader = dynamic(() => import('@components/Story/Reader'), {
  ssr: false,
});
export default function OneStory(props: any) {
  const { story } = props;
  return (
    <Reader story={story} />
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
          'first_page',
          'nodes',
          'pages.answers',

        ],
      },
      {
        encodeValuesOnly: true,
      },
    );
    const [story] = await fetchCMS(`/api/stories?${cmsQuery}`);

    return {
      props: {
        story: story.attributes,
      },
    };
  } catch (error) {
    return {
      props: {
        story: {},
      },
    };
  }
}
