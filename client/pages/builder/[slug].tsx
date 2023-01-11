import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { fetchCMS } from '@lib/cms';
import qs from 'qs';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { isMobile } from 'react-device-detect';
import Modal from '@components/Modal';
import { useRouter } from 'next/router';

const Diagram = dynamic(() => import('@components/Diagram'), {
  ssr: false,
});

export default function Builder(props: any) {
  const { story } = props;
  const router = useRouter();

  const [openIsMobile, setOpenIsMobile] = useState(false);
  useEffect(() => {
    if (isMobile) {
      setOpenIsMobile(true);
    }
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden">
      {!isMobile && (

      <DndProvider backend={HTML5Backend}>
        {story && <Diagram story={story} />}
      </DndProvider>
      )}
      <Modal
        width="100%"
        visible={openIsMobile}
        onCancel={() => {
          router.push('/builder');
          setOpenIsMobile(false);
        }}
        closable
        bodyStyle={{
          backgroundColor: '#1B263B',
        }}
      >
        <p> Soorry the builder is not mobile friendly</p>
      </Modal>
    </div>
  );
}
Builder.auth = true;

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
          'first_page',
          'nodes',
          'pages.answers',

        ],
      },
      {
        encodeValuesOnly: true,
      },
    );
    const [story] = await fetchCMS(`/api/stories?${cmsQuery}&publicationState=preview`);
    return {
      props: {
        story: { id: story.id, ...story.attributes },
      },
    };
  } catch (error) {
    return {
      props: {
        story: {},
      },
    };
  }
}
