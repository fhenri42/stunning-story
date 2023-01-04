/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import LeaderLine from 'react-leader-line';
import NodeCard from '@components/Diagram/nodeCard';
import Button from '@components/Button';
import { v4 as uuidv4 } from 'uuid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Xarrow, { Xwrapper, useXarrow } from 'react-xarrows';
import Target from './target';

const nodeTest = [
  {
    id: '475ef8a2-5c69-4fb8-a5d4-b4874d2a9d5b',
    data: {
      text: 'Ca va ?',
    },
    input: [],
    outputs: [
      'dba89cc8-4350-4189-8774-deaafc5a9a28',
    ],
  },
  {
    id: 'dba89cc8-4350-4189-8774-deaafc5a9a28',
    port_id: 'port-0.08981838155458655',
    data: {
      text: 'Non',
    },
    input: '475ef8a2-5c69-4fb8-a5d4-b4874d2a9d5b',
    outputs: [
      'COPY_475ef8a2-5c69-4fb8-a5d4-b4874d2a9d5b',
      'COPY_2_475ef8a2-5c69-4fb8-a5d4-b4874d2a9d5b',
    ],
  },
  {
    id: 'COPY_475ef8a2-5c69-4fb8-a5d4-b4874d2a9d5b',
    data: {
      text: 'c est la fin',
    },
    input: 'dba89cc8-4350-4189-8774-deaafc5a9a28',
    outputs: [

    ],
  },
  {
    id: 'COPY_2_475ef8a2-5c69-4fb8-a5d4-b4874d2a9d5b',
    data: {
      text: 'c est la fin nul',
    },
    input: 'dba89cc8-4350-4189-8774-deaafc5a9a28',
    outputs: [

    ],
  },
];

let tmpStoryGraph = [];
export default function Test() {
  const updateXarrow = useXarrow();
  const [storyGraph, setStoryGraph] = useState([]);
  const [nodeList, setNodeList] = useState([]);

  const addingNode = (node: any, targetId: any) => {
    console.log('WTF =>', storyGraph, tmpStoryGraph);
    if (node.input !== 'null') {
      const indexInput = tmpStoryGraph.findIndex((n) => n.id === node.input);
      if (indexInput !== -1) {
        // node.input = tmpStoryGraph[indexInput].id;
        const outputIndex = tmpStoryGraph[indexInput].outputs.findIndex((n) => n.id === targetId);
        tmpStoryGraph[indexInput].outputs[outputIndex] = ({ type: 'node', id: targetId });
      }
    }
    tmpStoryGraph = [...tmpStoryGraph, { ...node }];
    setStoryGraph([...tmpStoryGraph, { ...node }]);
  };

  const displayNodes = (currentNode: any) => {
    if (currentNode === undefined) return;
    console.log(currentNode.id);
    // console.log(output.id);
    return (
      <div className="flex flex-row items-center justify-start relative">
        <div id={currentNode.id} className="bg-blue-600 p-2 ml-14 mt-10">{currentNode.data.text}</div>
        <div className="flex flex-col">

          {currentNode.outputs.map((output: any) => {
            if (output.type === 'target') {
              return (
                <Target
                  key={output.id}
                  targetId={output.id}
                  input={currentNode.id}
                  addingNode={addingNode}
                />
              );
            }
            const outputIndex = storyGraph.findIndex((n) => n.id === output.id);
            return displayNodes(storyGraph[outputIndex]);
          })}

        </div>
      </div>
    );
  };

  console.log('storyGraph =>', storyGraph);
  useEffect(() => {
    setInterval(() => {
      updateXarrow();
    }, 1000);
  }, []);
  return (
    <div>

      <DndProvider backend={HTML5Backend}>

        <div className="flex flex-row">
          <div className="flex flex-col bg-red-400 w-1/12 h-screen overflow-auto">
            <Button
              label="Add node"
              onClick={() => {
                const node = {
                  sourceId: uuidv4(),
                  input: 'null',
                  outputsNbr: 2,
                  outputs: [
                    { type: 'target', id: uuidv4() },
                    { type: 'target', id: uuidv4() }],
                  data: {
                    text: 'New node',
                  },
                };
                setNodeList([...nodeList, node]);
              }}
            />
            {nodeList.length > 0 && nodeList.map((node) => (<NodeCard key={node.sourceId} {...node} />))}
          </div>
          <div className="h-screen w-screen overflow-auto pb-20 bg-opacity-10 relative">

            {storyGraph.length > 0 ? displayNodes(storyGraph[0])
              : (
                <Target
                  input="null"
                  addingNode={addingNode}
                />
              )}

            <div className="absolute bg-grid opacity-50 top-0" />

          </div>

        </div>
      </DndProvider>
      <Xwrapper>

        {storyGraph.length > 0 && storyGraph.map((node) => node.outputs.map((output) => (
          <>
            {output.type === 'target' && (
            <Xarrow
              start={node.id}
              end={output.id}
              color="green"

            />
            )}
          </>
        )))}
        {storyGraph.length > 0 && storyGraph.map((node) => (
          <>
            {node.input !== 'null' && (
            <Xarrow
              start={node.input}
              end={node.id}
            />
            )}
          </>

        ))}

      </Xwrapper>

    </div>
  );
}
