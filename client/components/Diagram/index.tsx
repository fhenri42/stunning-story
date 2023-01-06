/* eslint-disable consistent-return */
import React, { useState, useCallback, useEffect } from 'react';
import NodeCard from '@components/Diagram/nodeCard';
import Button from '@components/Button';
import { useDrag, useDrop } from 'react-dnd';
import Xarrow, { Xwrapper, useXarrow } from 'react-xarrows';
import NewNode from '@components/newNode';
import update from 'immutability-helper';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import Target from './target';

function DisplayNodes(props: any) {
  const { currentNode, storyGraph, addingNode } = props;
  const { left, top } = currentNode;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'BOX',
      item: currentNode,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [currentNode.id, currentNode.left, currentNode.top],
  );
  if (currentNode === undefined) return <div />;

  console.log('currentNode =>', currentNode);

  return (
    <div
      key={currentNode.id}
      className="flex flex-row items-center justify-start"
      // style={{ left, top }}
    >
      <div
        // ref={drag}
        id={currentNode.id}
        className="bg-blue-600 p-2 ml-10 mr-20 mt-10 rounded-lg w-[300px] text-center text-ellipsis text-xs h-20"
        // style={{ backgroundColor: '#F5F5F5', border: '1px solid #E0E0E0' }}
      >
        {currentNode.text}
      </div>
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
                left={left + 200}
                top={top + 100}
              />
            );
          }
          const outputIndex = storyGraph.findIndex((n) => n.id === output.id);
          return (
            <DisplayNodes
              currentNode={storyGraph[outputIndex]}
              storyGraph={storyGraph}
              addingNode={addingNode}
            />
          );
        })}

      </div>
    </div>
  );
}
let tmpStoryGraph = [];

export default function Diagram(props: any) {
  const { story } = props;
  const updateXarrow = useXarrow();
  const [storyGraph, setStoryGraph] = useState([]);
  const [addNewNodeModal, setAddNewNodeModal] = useState(false);
  const [zoom, setZoom] = useState('100%');

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

  const moveNode = useCallback(
    (id, left, top) => {
      console.log('CICI');
      const index = storyGraph.findIndex((n) => n.id === id);
      storyGraph[index] = { ...storyGraph[index], left, top };
      setStoryGraph([...storyGraph]);
    },
    [storyGraph, setStoryGraph],
  );
  const [, drop] = useDrop(
    () => ({
      accept: 'BOX',
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveNode(item.id, left, top);
        return undefined;
      },
    }),
    [moveNode],
  );
  useEffect(() => {
    setInterval(() => {
      updateXarrow();
    }, 100);
  }, []);
  console.log('StoryGraph =>', storyGraph);
  return (
    <div className="flex flex-col">
      <div className="flex flex-row h-16 w-full bg-slate-700">
        <Button
          label="Add node"
          onClick={() => {
            setAddNewNodeModal(true);
          }}
        />
        <PlusCircleIcon
          className="w-10 h-10"
          onClick={() => {
            setZoom((zoom) => {
              const newZoom = parseFloat(zoom) + 10;
              return `${newZoom}%`;
            });
          }}
        />
        <MinusCircleIcon
          className="w-10 h-10"
          onClick={() => {
            setZoom((zoom) => {
              const newZoom = parseFloat(zoom) - 10;
              return `${newZoom}%`;
            });
          }}
        />
      </div>
      <div className="flex flex-row items-start justify-start">
        <div className="flex flex-col items-center  w-1/6 h-screen ">
          <h1 className="text-2xl"> All your nodes:</h1>
          <div className="overflow-auto w-full pb-20">
            {story.nodes.length > 0 && [...story.nodes].map((node) => (<NodeCard key={node.sourceId} {...node} />))}
          </div>

        </div>
        <div className="h-screen w-5/6 overflow-auto pb-20">

          <div
            ref={drop}
            className="bg-opacity-10 relative"
            style={{
              height: '100000px',
              width: '100000px',
              zoom,
            }}
          >

            {storyGraph.length > 0 ? (
              <DisplayNodes
                currentNode={storyGraph[0]}
                storyGraph={storyGraph}
                addingNode={addingNode}
              />
            )
              : (
                <Target
                  input="null"
                  addingNode={addingNode}
                />
              )}

          </div>
          <div className="absolute bg-grid opacity-50 top-0" />

        </div>

      </div>

      <div
        style={{
          zoom,
        }}
      >

        <Xwrapper>

          {storyGraph.length > 0 && storyGraph.map((node) => node.outputs.map((output) => {
            if (output.type === 'target') {
              return (
                <Xarrow
                  labels={<p className="text-xs z-50 text-ellipsis w-10 text-center">{output.value}</p>}
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
                  labels={<p className="text-xs z-50 text-ellipsis w-10 text-center">{node.question}</p>}

                  key={`${node.id}`}
                  start={node.input}
                  end={node.id}
                />
              );
            }
            return null;
          })}

        </Xwrapper>
      </div>

      {addNewNodeModal && (
        <NewNode story={story} addNewNodeModal={addNewNodeModal} setAddNewNodeModal={setAddNewNodeModal} />
      )}
    </div>
  );
}
