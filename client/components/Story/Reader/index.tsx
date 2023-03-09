import React, { useState, useEffect } from 'react';
import Answer from '@components/Answer';
import Question from '@components/Question';
import Button from '@components/Button';
import { useRouter } from 'next/router';
import DeviceOrientation, { Orientation } from 'react-screen-orientation';
import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';
import PopConfirm from '@components/PopConfirm';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const audio = new Audio();

export default function Reader(props: any) {
  const { story } = props;
  const { t } = useTranslation('common');
  const storyGraph = story.storyGraph || [];
  const [changeNode, setChangeNode] = useState(true);
  const [restartOpen, setRestartOpen] = useState(false);

  const [currentNode, setCurrentNode] = useState(storyGraph[0]);
  const [isPlaying, setIsPlaying] = React.useState(false);

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
    const data: any = JSON.parse(localStorage.getItem(story.slug));
    if (data?.index) {
      setCurrentNode(storyGraph[data.index]);
    }

    audio.src = story.audio;
    return () => {
      audio.pause();
    };
  }, [changeNode]);

  if (!currentNode || !currentNode.text) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl">{t('reader.no_story')}</p>
        <Button
          label="Quit"
          type="danger"
          size="small"
          onClick={() => {
            const newData = JSON.stringify({ index: 0 });
            localStorage.setItem(story.slug, newData);
            if (router.pathname.includes('preview')) {
              router.back();
              return;
            }
            router.replace('/stories');
          }}
          className="z-10"
        />
      </div>
    );
  }
  return (
    <DeviceOrientation lockOrientation="landscape">
      <Orientation orientation="portrait" alwaysRender={false}>
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-2xl">{t('reader.rotate_message')}</p>
        </div>
      </Orientation>
      <Orientation orientation="landscape" alwaysRender={false}>
        <div className="w-screnn h-screen">
          {changeNode ? (
            <motion.div
              initial="hidden"
              animate="enter"
              exit="exit"
              variants={variants}
              transition={{ ztype: 'linear' }}
              className="h-3/5 lg:h-4/6 flex flex-col items-center justify-center relative"
            >
              <div className="absolute top-3 right-10 flex flex-row items-center">
                {story.audio && isPlaying && (
                  <div className="p-2 mr-2 bg-green-500 z-50 rounded-lg">
                    <SpeakerWaveIcon
                      onClick={() => {
                        setIsPlaying(!isPlaying);
                        audio.pause();
                      }}
                      className="h-5 w-5 text-white"
                    />
                  </div>
                )}
                {story.audio && !isPlaying && (
                  <div className="p-2 mr-2 bg-red-500 z-50 rounded-lg">
                    <SpeakerXMarkIcon
                      onClick={() => {
                        setIsPlaying(!isPlaying);
                        audio.play();
                      }}
                      className="h-5 w-5 text-white"
                    />
                  </div>
                )}
                <Button
                  label="Restart"
                  size="small"
                  background="bg-blue-600"
                  onClick={() => {
                    setRestartOpen(true);
                  }}
                  className="z-10 mr-3"
                />
                <PopConfirm
                  title={t('reader.restart_title')}
                  text={t('reader.restart_message')}
                  isOpen={restartOpen}
                  setIsOpen={setRestartOpen}
                  okText="Oui"
                  cancelText="Non"
                  type="danger"
                  confirm={async () => {
                    setCurrentNode(storyGraph[0]);
                    const newData = JSON.stringify({ index: 0 });
                    localStorage.setItem(story.slug, newData);
                  }}
                />
                <Button
                  label="Quit"
                  type="danger"
                  size="small"
                  onClick={() => {
                    if (router.pathname.includes('preview')) {
                      router.back();
                      return;
                    }
                    router.replace('/stories');
                  }}
                  className="z-10"
                />
              </div>
              {currentNode?.bgUrl && (
                <img
                  className="absolute h-full w-full blur-xl flex flec-col items-center justify-center bg-black"
                  src={currentNode?.bgUrl}
                  alt="bg-bgUrl"
                />
              )}
              {currentNode?.bgUrl && (
                <img
                  className="absolute h-full flex flec-col items-center justify-center bg-black"
                  src={currentNode?.bgUrl}
                  alt="bg-bgUrl"
                />
              )}

              <Question
                audioUrl={currentNode.audio}
                className="w-3/4 lg:w-1/2 lg:text-lg text-sm text-center mb-5 lg:mb-10 mt-auto whitespace-pre-wrap"
              >
                {currentNode.text}
              </Question>
            </motion.div>
          ) : (
            <div className="h-3/5 lg:h-3/4 flex flex-col items-center justify-center relative" />
          )}

          <div className="flex flex-col w-full items-center justify-evenly bg-black bg-opacity-50 p-2 lg:p-5 h-2/5 lg:h-2/6 ">
            {currentNode.outputs.length === 0 && currentNode.isVictory && (
              <h1 className="text-green-300 text-3xl text-center ">
                {t('reader.victory_title')}
              </h1>
            )}
            {currentNode.outputs.length === 0 && !currentNode.isVictory && (
              <h1 className="text-red-300 text-3xl text-center ">
                {t('reader.defeat_title')}
              </h1>
            )}
            <div className="flex flex-row w-full justify-evenly  items-center h-full">
              {currentNode.outputs.map((a: any) => (
                <Answer
                  key={a.id}
                  className="w-[47%] overflow-scroll max-h-full"
                  onClick={() => {
                    const index = storyGraph.findIndex(
                      (n) => n.sourceId === a.sourceId,
                    );
                    setChangeNode(false);
                    setCurrentNode(storyGraph[index]);
                    const newData = JSON.stringify({ index });
                    localStorage.setItem(story.slug, newData);
                  }}
                >
                  <ReactMarkdown
                    className="text-xs lg:text-base whitespace-pre-wrap"
                    remarkPlugins={[gfm]}
                  >
                    {a.value}
                  </ReactMarkdown>
                </Answer>
              ))}
              {currentNode.outputs.length === 0 && (
                <>
                  <Answer
                    className="w-[47%] bg-green-500"
                    onClick={() => {
                      setChangeNode(false);
                      const newData = JSON.stringify({ index: 0 });
                      localStorage.setItem(story.slug, newData);
                      setCurrentNode(storyGraph[0]);
                    }}
                  >
                    {t('reader.play_again')}
                  </Answer>
                  <Answer
                    className="w-[47%] bg-red-500"
                    onClick={() => {
                      if (router.pathname.includes('preview')) {
                        router.back();
                        return;
                      }
                      router.replace('/stories');
                    }}
                  >
                    {t('reader.quit')}
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
