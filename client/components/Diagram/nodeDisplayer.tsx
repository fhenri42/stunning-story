/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable consistent-return */

import Divider from '@components/Divider';
import Input from '@components/Input';
import Modal from '@components/Modal';
import { TrashIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import Target from './target';

export default function DisplayNodes(props: any) {
  const {
    currentNode, storyGraph, addingNode, removeNode,
  } = props;
  const [openDetails, setOpenDetails] = useState(false);
  if (currentNode === undefined) return <div />;

  return (
    <div
      key={currentNode.id}
      className="flex flex-row items-center justify-start"
    >
      <div
        id={currentNode.id}
        className="h-28 bg-blue-600 p-2 ml-10 mr-20 mt-10 relative rounded-lg w-[150px] flex flex-col items-center justify-center cursor-pointer"
        onClick={() => {
          setOpenDetails(!openDetails);
        }}
      >
        {currentNode.bgUrl && (
        <img className="absolute w-full h-full opacity-30" src={currentNode.bgUrl} alt="bg-bgUrl" />
        )}
        {currentNode.outputs.findIndex((n: any) => n.type === 'node') === -1 && (
        <TrashIcon
          className="text-red-400 h-5 w-5 mr-2 cursor-pointer z-50 absolute top-1 left-1"
          onClick={() => {
            removeNode(currentNode.id);
          }}
        />
        )}
        <p className="text-center text-ellipsis text-xs line-clamp-2">
          {currentNode.text}

        </p>
      </div>
      {currentNode.isSameOutcome ? (
        <div
          className="flex flex-col"
        >
          {(() => {
            const output = currentNode.outputs[0];
            if (output.type === 'target') {
              return (
                <Target
                  value={currentNode.outputs.map((v) => v.value).join(', ')}
                  key={output.id}
                  targetId={output.id}
                  input={currentNode.id}
                  addingNode={addingNode}
                  isSameOutcome={currentNode.isSameOutcome}
                />
              );
            }
            const outputIndex = storyGraph.findIndex((n) => n.id === output.id);
            return (
              <DisplayNodes
                currentNode={storyGraph[outputIndex]}
                storyGraph={storyGraph}
                addingNode={addingNode}
                removeNode={removeNode}
              />
            );
          })()}
        </div>
      ) : (
        <div
          className="flex flex-col"
        >
          {currentNode.outputs.map((output: any) => {
            if (output.type === 'target') {
              return (
                <Target
                  value={output.value}
                  key={output.id}
                  targetId={output.id}
                  input={currentNode.id}
                  addingNode={addingNode}
                />
              );
            }
            const outputIndex = storyGraph.findIndex((n) => n.id === output.id);
            return (
              <DisplayNodes
                currentNode={storyGraph[outputIndex]}
                storyGraph={storyGraph}
                addingNode={addingNode}
                removeNode={removeNode}
              />
            );
          })}
        </div>
      )}

      <Modal
        visible={openDetails}
        onCancel={() => { setOpenDetails(false); }}
        bodyStyle={{
          backgroundColor: '#1B263B',
          width: '100%',
        }}
      >
        <p>{currentNode.text}</p>
        <div className="flex flex-row mt-3">

          {currentNode.outputs.map((output: any) => (
            <p
              className="p-2 m-2 bg-red-400 rounded-lg"
              key={output.id}
            >
              {output.value}
            </p>
          ))}
        </div>

      </Modal>
    </div>
  );
}
