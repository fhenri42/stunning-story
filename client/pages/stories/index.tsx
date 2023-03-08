/* eslint-disable jsx-a11y/no-redundant-roles */
import { fetchCMS } from '@lib/cms';
import qs from 'qs';
import Link from 'next/link';
import Header from '@components/Header';
import StroyCard from '@components/StoryCard';
import useTranslation from 'next-translate/useTranslation';
import Footer from '@components/Footer';

export default function Home(props: any) {
  const { stories } = props;
  const { t } = useTranslation('common');
  return (
    <div className="bg-[#212121] h-screen">
      <Header />
      <div className="flex flex-row items-center justify-center mx-20 mt-10">
        <h1 className="text-3xl text-center">{t('reader.title')}</h1>
      </div>
      <div className="relative mt-14 px-6 lg:px-8 lg:mx-16">
        <div className="absolute inset-0">
          <div className="h-1/3  sm:h-2/3" />
        </div>
        <div className="max-w-8xl">
          <div className="grid  mx-auto max-w-lg gap-5 lg:max-w-none lg:grid-cols-4">
            {stories?.length > 0
              && stories.map((story: any) => (
                <Link
                  key={story.attributes.slug}
                  href={`/stories/${story.attributes.slug}`}
                >
                  <StroyCard story={story.attributes} />
                </Link>
              ))}
            {stories?.length === 0 && <h1>{t('reader.no_story')}</h1>}
          </div>
        </div>
      </div>
      <Footer />
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
