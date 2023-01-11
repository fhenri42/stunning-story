/* eslint-disable jsx-a11y/no-redundant-roles */
import { fetchCMS } from '@lib/cms';
import qs from 'qs';
import Link from 'next/link';
import Header from '@components/Header';
import StroyCard from '@components/StoryCard';

export default function Home(props: any) {
  const { stories } = props;
  return (
    <div className="bg-[#212121]">
      <Header />
      <div className="flex flex-row items-center justify-between mx-20 mt-10">
        <h1 className="text-3xl">Chosse the story you like to play</h1>
      </div>
      <div className="flex flex-row items-center justify-start flex-wrap p-20">
        {stories?.length > 0 && stories.map((story: any) => (
          <Link
            className="w-1/4 mx-5"
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
          'author',

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
