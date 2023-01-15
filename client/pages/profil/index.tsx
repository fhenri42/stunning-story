import useTranslation from 'next-translate/useTranslation';
import Header from '@components/Header';

export default function Profil(props: any) {
  const { stories } = props;
  const { t } = useTranslation('common');

  return (
    <div className="bg-[#212121]">
      <Header />
      THIS WILL BE the profil page
    </div>
  );
}
