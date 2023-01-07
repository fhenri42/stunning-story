/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import NodeCard from '@components/Diagram/nodeCard';
import Button from '@components/Button';
import Xarrow, { Xwrapper, useXarrow } from 'react-xarrows';
import NewNode from '@components/newNode';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import { updateStory } from '@http/self';
import DisplayNodes from './nodeDisplayer';
import Target from './target';

let tmpStoryGraph = [];

// TODO add variable to the builder
export default function Diagram(props: any) {
  const [story, setStory] = useState(props.story);
  const updateXarrow = useXarrow();
  const [storyGraph, setStoryGraph] = useState(story.storyGraph || []);
  const [addNewNodeModal, setAddNewNodeModal] = useState(false);
  const [zoom, setZoom] = useState('100%');

  const addingNode = (node: any, targetId: any) => {
    if (node.input !== 'null') {
      const indexInput = tmpStoryGraph.findIndex((n) => n.id === node.input);
      if (indexInput !== -1) {
        const outputIndex = tmpStoryGraph[indexInput].outputs.findIndex((n) => n.id === targetId);
        if (outputIndex === -1) return;
        tmpStoryGraph[indexInput].outputs[outputIndex].id = targetId;
        tmpStoryGraph[indexInput].outputs[outputIndex].type = 'node';
      }
    }
    tmpStoryGraph = [...tmpStoryGraph, { ...node }];

    updateStory({
      ...story,
      storyGraph: [...tmpStoryGraph],
    });
    setStoryGraph([...tmpStoryGraph]);
  };

  const removeNode = (nodeId: any) => {
    const index = tmpStoryGraph.findIndex((n) => n.id === nodeId);
    if (index !== -1) {
      const indexParent = tmpStoryGraph.findIndex((n) => n.id === tmpStoryGraph[index].input);

      if (indexParent !== -1) {
        const indexOutput = tmpStoryGraph[indexParent].outputs.findIndex((n) => n.id === nodeId);
        tmpStoryGraph[indexParent].outputs[indexOutput].type = 'target';
      }

      tmpStoryGraph.splice(index, 1);
      setStoryGraph([...tmpStoryGraph]);
      updateStory({
        ...story,
        storyGraph: [...tmpStoryGraph],
      });
    }
  };
  useEffect(() => {
    if (story.storyGraph) {
      tmpStoryGraph = story.storyGraph;
    }
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center h-16 w-full bg-slate-700">
        <Button
          size="small"
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
            {story.nodes.length > 0 && [...story.nodes].map((node) => (
              <NodeCard
                key={node.sourceId}
                {...node}
                story={story}
                setStory={setStory}
              />
            ))}
          </div>

        </div>
        <div
          className="h-screen w-5/6 overflow-auto pb-20"
          onScroll={(e) => {
            updateXarrow();
          }}
        >

          <div
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
                removeNode={removeNode}
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
                  labels={<p className="text-xs  text-ellipsis w-10 text-center">{output.value}</p>}
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
                  labels={<p className="text-xs  text-ellipsis w-10 text-center">{node.question}</p>}

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
        <NewNode
          setStory={setStory}
          story={story}
          addNewNodeModal={addNewNodeModal}
          setAddNewNodeModal={setAddNewNodeModal}
        />
      )}
    </div>
  );
}
