import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { fetchCMS } from '@lib/cms';
import qs from 'qs';

const MyDiagram = dynamic(() => import('@components/Diagram'), {
  ssr: false,
});

export default function Builder(props: any) {
  const { story } = props;
  console.log('story', story);
  return (
    <div className="h-screen w-screen overflow-auto">

      <MyDiagram story={story} />

    </div>
  );
}

export async function getServerSideProps({ query }) {
  try {
    console.log(query);
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
          'pages',
          'pages.answers',

        ],
      },
      {
        encodeValuesOnly: true,
      },
    );
    const story = await fetchCMS(`/api/stories?${cmsQuery}`);

    return {
      props: {
        story: story[0].attributes,
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
