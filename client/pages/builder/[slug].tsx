import React from 'react';
import dynamic from 'next/dynamic';
import { fetchCMS } from '@lib/cms';
import qs from 'qs';

const Diagram = dynamic(() => import('@components/Diagram'), {
  ssr: false,
});

export default function Builder(props: any) {
  const { story } = props;
  console.log(story);
  return (
    <div className="h-screen w-screen overflow-auto">
      {story && <Diagram story={story} />}

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
