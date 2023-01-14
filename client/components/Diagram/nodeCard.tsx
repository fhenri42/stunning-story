/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import EditNode from '@components/Node/EditNode';

export default function NodeCard(props: any) {
  const {
    node,
    story,
    setStory,
  } = props;

  const [editNodeModal, setEditNodeModal] = useState(false);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      item: {
        node,
        story,
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
      key={node.sourceId}
      ref={drag}
    >
      {node.bgUrl && (
        <img className="absolute rounded-lg w-full h-full opacity-30" src={node.bgUrl} alt="bg-bgUrl" />
      )}
      <div
        className="p-2 my-2 bg-blue-400 h-full rounded-lg flex flex-col items-center justify-center"
        style={{
          backgroundColor: '#1B263B',
        }}

      >

        <p className="text-white text-xs line-clamp-2 text-ellipsis">
          {node.text}
        </p>

        {editNodeModal && (
        <EditNode
          node={node}
          story={story}
          setStory={setStory}
          editNodeModal={editNodeModal}
          setEditNodeModal={setEditNodeModal}
        />
        )}

      </div>
    </div>

  );
}
