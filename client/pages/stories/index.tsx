/* eslint-disable jsx-a11y/no-redundant-roles */
import Head from 'next/head';
import { fetchCMS } from '@lib/cms';
import qs from 'qs';
import Link from 'next/link';
import Header from '@components/Header';
import { useSession } from 'next-auth/react';
import FeatureDisplay from '@components/Home/FeatureDisplay/indexs';
import TopStories from '@components/Home/TopStories';
import Footer from '@components/Home/Footer';
import StroyCard from '@components/StoryCard';

export default function Home(props: any) {
  const { data: session, status } = useSession();
  const { stories } = props;
  return (
    <div className="bg-[#212121]">
      <Header />
      <div className="flex flex-row items-center justify-start flex-wrap p-20">
        {stories?.length > 0 && stories.map((story: any) => (
          <Link
            key={story.attributes.slug}
            href={`/stories/${story.attributes.slug}`}
          >
            <StroyCard story={story.attributes} />
          </Link>
        ))}

      </div>
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
