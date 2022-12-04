import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { fetchCMS } from '@lib/cms';
import qs from 'qs';

const MyDiagram = dynamic(() => import('@components/Diagram'), {
  ssr: false,
});

export default function Builder(props: any) {
  const { story } = props;
  return (
    <div className="h-screen w-screen overflow-auto">
      {story && story.pages && <MyDiagram story={story} />}

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
          'pages',
          'pages.answers',

        ],
      },
      {
        encodeValuesOnly: true,
      },
    );
    const [story] = await fetchCMS(`/api/stories?${cmsQuery}`);
    story.attributes.pages = story.attributes.pages.data;
    story.attributes.pages = story.attributes.pages.map((p:any) => {
      const obj = p;
      obj.attributes.coordinates = p.attributes?.coordinates?.split(',').map((item: string) => parseInt(item, 10)) || [100, 100];
      return obj;
    });
    console.log('page =>', story.attributes.pages);

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
