import useTranslation from 'next-translate/useTranslation';
import StroyCard from '@components/StoryCard';
import Link from 'next/link';

export default function TopStories(props: any) {
  const { stories } = props;
  const { t } = useTranslation('common');

  return (
    <div className="relative bg-[#3a4042] px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0">
        <div className="h-1/3 sm:h-2/3" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('home.topStories.descriptionTitle')}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            {t('home.topStories.descriptionBody')}
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
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
    </div>
  );
}
