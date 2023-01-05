/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import NodeCard from '@components/Diagram/nodeCard';
import Button from '@components/Button';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Xarrow, { Xwrapper, useXarrow } from 'react-xarrows';
import NewNode from '@components/newNode';
import Target from './target';

let tmpStoryGraph = [];

export default function Diagram(props: any) {
  const { story } = props;
  const updateXarrow = useXarrow();
  const [storyGraph, setStoryGraph] = useState([]);
  const [addNewNodeModal, setAddNewNodeModal] = useState(false);

  const addingNode = (node: any, targetId: any) => {
    console.log('adding node', node, targetId);
    if (node.input !== 'null') {
      const indexInput = tmpStoryGraph.findIndex((n) => n.id === node.input);
      if (indexInput !== -1) {
        // node.input = tmpStoryGraph[indexInput].id;
        console.log(tmpStoryGraph);

        const outputIndex = tmpStoryGraph[indexInput].outputs.findIndex((n) => n.id === targetId);
        console.log('outputIndex', outputIndex);
        if (outputIndex === -1) return;
        tmpStoryGraph[indexInput].outputs[outputIndex].id = targetId;
        tmpStoryGraph[indexInput].outputs[outputIndex].type = 'node';
      }
    }
    tmpStoryGraph = [...tmpStoryGraph, { ...node }];
    setStoryGraph([...tmpStoryGraph]);
  };

  const displayNodes = (currentNode: any) => {
    if (currentNode === undefined) return;
    return (
      <div key={currentNode.id} className="flex flex-row items-center justify-start relative">
        <div id={currentNode.id} className="bg-blue-600 p-2 ml-14 mt-10">{currentNode.text}</div>
        <div className="flex flex-col">
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
            return displayNodes(storyGraph[outputIndex]);
          })}

        </div>
      </div>
    );
  };

  useEffect(() => {
    setInterval(() => {
      updateXarrow();
    }, 1000);
  }, []);
  console.log(storyGraph);
  return (
    <div>

      <DndProvider backend={HTML5Backend}>

        <div className="flex flex-row">
          <div className="flex flex-col bg-red-400 w-1/12 h-screen overflow-auto">
            <Button
              label="Add node"
              onClick={() => {
                setAddNewNodeModal(true);
                // const node = {
                //   sourceId: uuidv4(),
                //   input: 'null',
                //   outputsNbr: 2,
                //   outputs: [
                //     { type: 'target', id: uuidv4() },
                //     { type: 'target', id: uuidv4() }],
                //   data: {
                //     text: 'New node',
                //   },
                // };
                // setNodeList([...nodeList, node]);
              }}
            />
            {story.nodes.length > 0 && story.nodes.map((node) => (<NodeCard key={node.sourceId} {...node} />))}
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

        {storyGraph.length > 0 && storyGraph.map((node) => node.outputs.map((output) => {
          if (output.type === 'target') {
            return (
              <Xarrow
                labels={<p className="text-xs z-50">{output.value}</p>}
                start={node.id}
                end={output.id}
                color="green"
                key={`${output.id}`}
              />
            );
          }
          return null;
        }))}

        {storyGraph.length > 0 && storyGraph.map((node) => {
          if (node.input !== 'null') {
            return (
              <Xarrow
                labels={node.text}

                key={`${node.id}`}
                start={node.input}
                end={node.id}
              />
            );
          }
          return null;
        })}

      </Xwrapper>

      {addNewNodeModal && (
        <NewNode story={story} addNewNodeModal={addNewNodeModal} setAddNewNodeModal={setAddNewNodeModal} />
      )}
    </div>
  );
}
