import Modal from '@components/Modal';
import { TrashIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
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
        id={currentNode.sourceId}
        style={{
          backgroundColor: '#1B263B',
        }}
        onClick={() => {
          setOpenDetails(!openDetails);
        }}
        className="h-[80px]  p-2 ml-10 mr-20 mt-20 relative rounded-lg w-[170px] flex flex-col items-center justify-center cursor-pointer"
      >
        {currentNode?.bgUrl && (
          <img
            className="absolute rounded-lg w-full h-full opacity-30"
            src={currentNode?.bgUrl}
            alt="bg-bgUrl"
          />
        )}
        {currentNode.outputs.findIndex((n: any) => n.type === 'node')
          === -1 && (
          <TrashIcon
            className="text-red-400 h-5 w-5 mr-2 cursor-pointer z-50 absolute top-1 left-1"
            onClick={() => {
              removeNode(currentNode.sourceId);
            }}
          />
        )}
        <p className="text-center text-ellipsis text-xs line-clamp-2">
          {currentNode.text}
        </p>
      </div>
      <div className="flex flex-col">
        {currentNode.outputs.map((output: any) => {
          if (output.type === 'target') {
            return (
              <Target
                value={output.value}
                key={output.id}
                targetId={output.id}
                input={currentNode.sourceId}
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

      <Modal
        visible={openDetails}
        onCancel={() => {
          setOpenDetails(false);
        }}
        bodyStyle={{
          backgroundColor: '#1B263B',
          width: '100%',
        }}
        width="90%"
      >
        <p>{currentNode.text}</p>
        <div className="flex flex-row mt-3 h-full">
          {currentNode.outputs.map((output: any) => (
            <div
              key={output.id}
              className="p-2 m-2 bg-blue-400 rounded-lg  overflow-x-hidden overflow-y-auto h-full custom-scroll"
            >
              <ReactMarkdown
                className="text-xs lg:text-base whitespace-pre-wrap"
                remarkPlugins={[gfm]}
              >
                {output.value}
              </ReactMarkdown>
            </div>

          ))}
        </div>
      </Modal>
    </div>
  );
}
