/* eslint-disable jsx-a11y/no-redundant-roles */
import Head from 'next/head';
import { fetchCMS } from '@lib/cms';
import qs from 'qs';
import Header from '@components/Header';
import FeatureDisplay from '@components/Home/FeatureDisplay/indexs';
import TopStories from '@components/Home/TopStories';
import Footer from '@components/Footer';
import useTranslation from 'next-translate/useTranslation';

export default function Home(props: any) {
  const { stories } = props;
  const { t } = useTranslation('common');

  return (
    <div className="bg-[#212121]">
      <Head>
        <title>{t('name')}</title>
        <meta name="description" content={t('name')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <FeatureDisplay />
        <TopStories stories={stories} />
        <Footer />
      </main>
    </div>
  );
}

export async function getServerSideProps({ query }: any) {
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
