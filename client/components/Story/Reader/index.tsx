import React, { useState, useEffect } from 'react';
import Answer from '@components/Answer';
import Question from '@components/Question';
import Button from '@components/Button';
import { useRouter } from 'next/router';
import DeviceOrientation, { Orientation } from 'react-screen-orientation';
import { motion } from 'framer-motion';

export default function Reader(props: any) {
  const { story } = props;
  const storyGraph = story.storyGraph || [];
  const [changeNode, setChangeNode] = useState(true);
  const [currentNode, setCurrentNode] = useState(storyGraph[0]);
  console.log('currentNode', currentNode);
  const router = useRouter();
  const variants = {
    hidden: { opacity: 0, x: 200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 0 },
  };

  useEffect(() => {
    if (!changeNode) {
      setChangeNode(true);
    }
  }, [changeNode]);
  return (
    <DeviceOrientation lockOrientation="landscape">
      <Orientation orientation="portrait" alwaysRender={false}>
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-2xl">Please rotate your device</p>
        </div>
      </Orientation>
      <Orientation orientation="landscape" alwaysRender={false}>
        <div
          className="w-screnn h-screen"
        >
          {changeNode ? (

            <motion.div
              initial="hidden"
              animate="enter"
              exit="exit"
              variants={variants}
              transition={{ ztype: 'linear' }}
              className="h-3/5 lg:h-3/4 flex flex-col items-center justify-center relative"
            >
              <div className="absolute top-3 right-10">
                <Button
                  label="Quit"
                  type="danger"
                  size="small"
                  onClick={() => {
                    router.replace('/stories');
                  }}
                  className="z-10"
                />
              </div>
              {currentNode.bgUrl && (
              <img
                className="absolute h-full w-full blur-xl flex flec-col items-center justify-center bg-black"
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

              <Question audioUrl={currentNode.audio} className="w-3/4 lg:w-1/2 lg:text-lg text-sm text-center mb-5 lg:mb-10 mt-auto">
                {currentNode.text}
              </Question>
            </motion.div>
          ) : (
            <div
              className="h-3/5 lg:h-3/4 flex flex-col items-center justify-center relative"
            />
          )}

          <div className="flex flex-col w-full items-center justify-evenly bg-black bg-opacity-50 p-2 lg:p-10 lg:h-1/4 h-2/5">
            {currentNode.outputs.length === 0 && currentNode.isVictory && (
            <h1 className="text-green-300 text-3xl text-center ">Victory</h1>
            )}
            {currentNode.outputs.length === 0 && !currentNode.isVictory && (
            <h1 className="text-red-300 text-3xl text-center ">Defeat</h1>
            )}
            <div className="flex flex-row w-full lg:px-3 justify-evenly items-center flex-wrap h-full">
              {currentNode.outputs.map((a: any) => (
                <Answer
                  key={a.id}
                  className="w-[47%] lg:h-1/3"
                  onClick={() => {
                    const index = storyGraph.findIndex((n) => n.sourceId === a.sourceId);
                    setChangeNode(false);
                    setCurrentNode(storyGraph[index]);
                  }}
                >
                  <p className="text-xs lg:text-lg">
                    {a.value}

                  </p>
                </Answer>
              ))}
              {currentNode.outputs.length === 0 && (
              <>
                <Answer
                  className="w-[47%] bg-green-500"
                  onClick={() => {
                    setChangeNode(false);

                    setCurrentNode(storyGraph[0]);
                  }}
                >
                  Play Again
                </Answer>
                <Answer
                  className="w-[47%] bg-red-500"
                  onClick={() => {
                    router.replace('/stories');
                  }}
                >
                  Quit
                </Answer>

              </>
              )}

            </div>
          </div>
        </div>
      </Orientation>
    </DeviceOrientation>

  );
}
