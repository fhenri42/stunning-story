import Button from '@components/Button';
import { signIn, useSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const { t } = useTranslation('common');
  const { data: session } = useSession();
  const router = useRouter();
  const navigation = [
    { name: t('header.home'), href: '/' },
    { name: t('header.story'), href: '/stories' },
    { name: t('header.builder'), href: '/builder' },
    { name: t('header.doc'), href: '/docs' },
    { name: t('header.roadmap'), href: 'https://stunning-story.canny.io/', target: '_blank' },
  ];
  return (
    <header className="bg-[#3a4042]">
      <div className="flex w-full items-center justify-between border-b border-indigo-500 py-3 lg:border-none px-20">
        <div className="flex items-center">
          <Link href="/">
            <img className="h-16 w-auto rounded-lg" src="/logo.webp" alt="" />
          </Link>
          <div className="ml-10 hidden space-x-8 lg:block">
            {navigation.map((link) => (
              <a
                key={link.name}
                target={link.target}
                href={link.href}
                className={`text-base font-medium text-white hover:text-indigo-50 ${link.href === router.pathname ? ' underline underline-offset-2 decoration-[#8ecccc]' : ''}`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        {session && session.user && session.user.name ? (

          <div className="ml-10 space-x-4 flex flex-row items-center justify-center">
            <p>
              {session.user.name}
            </p>
            <img className="h-14 w-auto rounded-lg" src={session?.user?.image} referrerPolicy="no-referrer" alt="google_image" />
          </div>
        ) : (

          <div className="ml-10 space-x-4">

            <Button
              onClick={() => {
                signIn();
              }}
              label={t('header.signin')}
            />

          </div>
        )}

      </div>
      <div className="flex flex-wrap justify-center gap-x-6 py-4 lg:hidden">
        {navigation.map((link) => (
          <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-indigo-50">
            {link.name}
          </a>
        ))}
      </div>
    </header>
  );
}
