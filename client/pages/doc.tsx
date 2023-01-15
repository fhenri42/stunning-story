/* eslint-disable jsx-a11y/no-redundant-roles */
import Head from 'next/head';
import { fetchCMS } from '@lib/cms';
import qs from 'qs';
import Header from '@components/Header';
import FeatureDisplay from '@components/Home/FeatureDisplay/indexs';
import TopStories from '@components/Home/TopStories';
import Footer from '@components/Home/Footer';
import useTranslation from 'next-translate/useTranslation';

export default function Doc(props: any) {
  const { stories } = props;
  const { t } = useTranslation('common');

  return (
    <div className="bg-[#212121]">
      <Header />
      THIS WILL BE the doc page
    </div>
  );
}
