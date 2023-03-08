import { FireIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

export default function FeatureDisplay() {
  const { t } = useTranslation('common');
  return (
    <div className="relative overflow-hidden pb-32">
      <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <p className="mx-auto mt-5 text-[#8ecccc] max-w-xl text-xl">
            {t('name')}
          </p>
          <p className="mt-1 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t('home.title')}
          </p>
          <p className="mx-auto mt-5 max-w-xl text-xl text-gray-00">
            {t('home.subTitle')}
          </p>
        </div>
      </div>
      <div className="relative">
        <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
          <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
            <div>
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                  <FireIcon className="h-8 w-8 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-6">
                <h2 className="text-3xl font-bold tracking-tight text-white">{t('home.stories.descriptionTitle')}</h2>
                <p className="mt-4 text-lg text-gray-00">
                  {t('home.stories.descriptionBody')}
                </p>
                <div className="mt-6">
                  <Link
                    href="/stories"
                    className="inline-flex rounded-lg bg-blue-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-[#8ecccc] hover:bg-indigo-700 hover:ring-indigo-700"
                  >
                    {t('home.stories.button')}
                  </Link>
                </div>
              </div>
            </div>

          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0">
            <div className="lg:-mr-48 p-3 lg:pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
              <img
                className="w-full rounded-xl shadow-xl ring-1 ring-[#212121] ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                src="/images/story-exp.png"
                alt="Inbox user interface"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-24">
        <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
          <div className="mx-auto max-w-xl px-6 lg:col-start-2 lg:mx-0 lg:max-w-none lg:py-32 lg:px-0">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
              <PuzzlePieceIcon className="h-8 w-8 text-white" aria-hidden="true" />
            </span>
            <div className="mt-6">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                {t('home.builder.descriptionTitle')}

              </h2>
              <p className="mt-4 text-lg text-gray-00">
                {t('home.builder.descriptionBody')}
              </p>
              <div className="mt-6">
                <Link
                  href="/builder"
                  className="inline-flex rounded-lg bg-blue-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-[#8ecccc] hover:bg-indigo-700 hover:ring-indigo-700"
                >
                  {t('home.builder.button')}
                </Link>
              </div>
            </div>

          </div>
          <div className="mt-12 sm:mt-16 lg:col-start-1 lg:mt-0">
            <div className="-ml-48 pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
              <img
                className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                src="/images/builder-exp.png"
                alt="builder-bg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
