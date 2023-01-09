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

export default function Home(props: any) {
  const { data: session, status } = useSession();
  const { stories } = props;
  console.log('stories =>', stories);
  console.log('session =>', session);
  return (
    <div className="bg-[#212121]">
      <Header />

      <div className="flex flex-row items-center justify-start flex-wrap p-20">
        {stories.length > 0 && stories.map((story: any) => (
          <Link
            key={story.attributes.slug}
            href={`/stories/${story.attributes.slug}`}
          >
            <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={story.attributes.storyGraph[0].bgUrl} alt="" />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    {story.attributes.tags}
                  </p>
                  <p className="text-xl font-semibold text-gray-900">{story.attributes.title}</p>
                  <p className="mt-3 text-base text-gray-500">{story.attributes.description}</p>
                </div>
                {/* <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <span className="sr-only">{story?.attributes?.author?.name}</span>
                    <img className="h-10 w-10 rounded-full" src={story?.attributes?.author?.imageUrl} alt="" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {story?.attributes?.author?.name}
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={story.datetime}>{story.date}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>
                        {story.readingTime}
                        read
                      </span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
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
