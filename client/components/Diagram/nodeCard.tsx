import React, { useState, cloneElement, useEffect } from 'react';
import Button from '@components/Button';
import Modal from '@components/Modal';
import Input from '@components/Input';
import { useDrag } from 'react-dnd';

import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { PencilIcon } from '@heroicons/react/24/solid';
import Divider from '@components/Divider';
import EditNode from '@components/editNode';

export default function NodeCard(props: any) {
  const {
    sourceId, text, input, outputs, outputsNbr, isVictory, story, bgUrl, setStory, isSameOutcome,
  } = props;
  const [editNodeModal, setEditNodeModal] = useState(false);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      item: {
        text, input, outputs, outputsNbr, isSameOutcome, bgUrl,
      },
      type: 'blue',
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [],
  );
  return (
    <div
      className="mx-2 rounded-lg h-28 cursor-pointer relative"
      onClick={() => { setEditNodeModal(true); }}
      key={sourceId}
      ref={drag}

    >
      {bgUrl && (
        <img className="absolute rounded-lg w-full h-full opacity-30" src={bgUrl} alt="bg-bgUrl" />
      )}
      <div
        className="p-2 my-2 bg-blue-400 h-full rounded-lg flex flex-col items-center justify-center"
        style={{
          backgroundColor: '#1B263B',
        }}

      >

        <p className="text-white text-xs line-clamp-2 text-ellipsis">
          {text}
        </p>

        {editNodeModal && (
        <EditNode
          sourceId={sourceId}
          setStory={setStory}
          text={text}
          outputs={outputs}
          isVictory={isVictory}
          story={story}
          editNodeModal={editNodeModal}
          setEditNodeModal={setEditNodeModal}

        />
        )}

      </div>
    </div>

  );
}
