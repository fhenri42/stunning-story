import React, { useState } from 'react';

import Button from '@components/Button';
import useTranslation from 'next-translate/useTranslation';
import Switch from '@components/Switch';
import { updateStory } from '@http/self';
import { useRouter } from 'next/router';
import JsonView from '@components/BuilderViews/jsonView';
import PlayerView from '@components/BuilderViews/playerView';
import ItemView from '@components/BuilderViews/itemView';
import { toast } from 'react-toastify';

function exportToJsonFile(jsonData) {
  const dataStr = JSON.stringify(jsonData);
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;

  const exportFileDefaultName = 'data.json';

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}
export default function TopMenu(props: any) {
  const {
    story, setStory, storyGraph, forceUpadateStoryGraph,
  } = props;
  const router = useRouter();

  const { t } = useTranslation('common');

  const [openJsonView, setOpenJsonView] = useState(false);
  const [openPlayerView, setOpenPlayerView] = useState(false);
  const [openItemView, setOpenItemView] = useState(false);
  return (
    <div className="flex absolute top-0">
      <div
        className={` flex flex-row ${
          !story.publishedAt ? 'bg-gray-500' : 'bg-green-600'
        } rounded-br-xl p-2`}
      >
        <Switch
          checked={story.publishedAt}
          onChange={async () => {
            await updateStory({
              ...story,
              publishedAt: !story.publishedAt ? new Date() : null,
            });
            setStory({
              ...story,
              publishedAt: !story.publishedAt ? new Date() : null,
            });
          }}
          label={
            !story.publishedAt ? (
              <p className="w-20">{t('builder.draft')}</p>
            ) : (
              <p className="w-20">{t('builder.published')}</p>
            )
          }
        />
      </div>
      <Button
        label={t('builder.preview')}
        className="ml-2 rounded-t-none"
        size="small"
        onClick={() => {
          router.push(`/builder/preview/${story.slug}`);
        }}
      />
      <Button
        label={t('builder.export')}
        background="bg-blue-400"
        className="ml-10 rounded-t-none"
        size="small"
        onClick={() => {
          exportToJsonFile(storyGraph);
        }}
      />
      <Button
        label="Player info"
        background="bg-blue-400"
        className="ml-10 rounded-t-none"
        size="small"
        onClick={() => {
          toast.info('Not implemented yet, comming soon!');
          // setOpenPlayerView(true);
        }}
      />
      <Button
        label="Items"
        background="bg-purple-400"
        className="ml-2 rounded-t-none"
        size="small"
        onClick={() => {
          toast.info('Not implemented yet, comming soon!');
          // setOpenItemView(true);
        }}
      />
      <Button
        label="Ennemies"
        background="bg-cyan-400"
        className="ml-2 rounded-t-none"
        size="small"
        onClick={() => {
          toast.info('Not implemented yet, comming soon!');
          // setOpenJsonView(true);
        }}
      />
      <Button
        label={t('builder.debug_tool.open')}
        background="bg-red-500"
        className="ml-10 rounded-t-none"
        size="small"
        onClick={() => {
          setOpenJsonView(true);
        }}
      />
      {openJsonView && (
        <JsonView
          openView={openJsonView}
          setOpenView={setOpenJsonView}
          storyGraph={storyGraph}
          onStoryGraphChange={(newStoryGraph) => {
            setOpenJsonView(false);
            forceUpadateStoryGraph(story.id, newStoryGraph);
          }}
        />
      )}
      {openPlayerView && (
        <PlayerView openView={openPlayerView} setOpenView={setOpenPlayerView} />
      )}
      {openItemView && (
        <ItemView openView={openItemView} setOpenView={setOpenItemView} />
      )}
    </div>
  );
}
