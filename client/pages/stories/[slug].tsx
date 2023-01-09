import { useEffect, useState } from 'react';
import Answer from '@components/Answer';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import Question from '@components/Question';
import qs from 'qs';
import { fetchCMS } from '@lib/cms';
import Link from 'next/link';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Button from '@components/Button';
import { useRouter } from 'next/router';

export default function Page(props: any) {
  const [story, setStory] = useState(props.story);
  const [storyGraph, setStoryGraph] = useState(story.storyGraph || []);
  const [currentNode, setCurrentNode] = useState(storyGraph[0]);
  const router = useRouter();
  console.log(currentNode);

  return (
    <div
      className="w-screnn h-screen "
    >

      <div className="h-3/4  flex flex-col items-center justify-center relative">
        <div className="absolute top-3 right-10">
          <Button
            label="Quit"
            type="danger"
            size="small"
            onClick={() => {
              router.replace('/');
            }}
            className="z-10"
          />
        </div>
        {currentNode.bgUrl && (
        <img
          className="absolute h-full w-full  blur-xl flex flec-col items-center justify-center bg-black"
          src={currentNode.bgUrl}
          alt="bg-bgUrl"
        />
        )}
        {currentNode.bgUrl && (
          <img
            className="absolute h-full flex flec-col items-center justify-center bg-black"
            src={currentNode.bgUrl}
            alt="bg-bgUrl"
          />
        )}

        <Question text={currentNode.text} className="w-1/2 text-lg text-center mb-10 mt-auto">
          {currentNode.text}
        </Question>
      </div>

      <div className="flex flex-col w-full  items-center justify-evenly bg-black bg-opacity-50 p-10 h-1/4">
        {currentNode.outputs.length === 0 && currentNode.isVictory && (
        <h1 className="text-green-300 text-3xl text-center ">Vicotory</h1>
        )}
        {currentNode.outputs.length === 0 && !currentNode.isVictory && (
        <h1 className="text-red-300 text-3xl text-center ">Defeat</h1>
        )}
        <div className="flex flex-row w-full px-3 justify-evenly items-center flex-wrap h-full">
          {currentNode.outputs.map((a: any) => (
            <Answer
              key={a.id}
              className="w-[47%] h-1/3"
              onClick={() => {
                const index = storyGraph.findIndex((n) => n.id === a.id);
                setCurrentNode(storyGraph[index]);
              }}
            >
              {a.value}
            </Answer>
          ))}
          {currentNode.outputs.length === 0 && (
            <>
              <Answer
                className="w-[47%] bg-green-500"
                onClick={() => {
                  setCurrentNode(storyGraph[0]);
                }}
              >
                Play Again
              </Answer>
              <Answer
                className="w-[47%] bg-red-500"
                onClick={() => {
                  router.replace('/');
                }}
              >
                Quit
              </Answer>

            </>
          )}

        </div>
      </div>
    </div>
  );
}

{ /* {variables.length > 0 && (

      <div className="rounded-lg border-[#eaeaea] border-2 p-5 bg-black bg-opacity-60 absolute top-5 left-5">
        { variables.map((v) => (
          <p>
            {Object.keys(v)[0]}
            {': '}
            {v[Object.keys(v)[0]]}
          </p>
        ))}
      </div>
      )} */ }

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
          'first_page',
          'nodes',
          'pages.answers',

        ],
      },
      {
        encodeValuesOnly: true,
      },
    );
    const [story] = await fetchCMS(`/api/stories?${cmsQuery}`);

    return {
      props: {
        story: story.attributes,
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
