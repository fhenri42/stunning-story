/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import NodeCard from '@components/Diagram/nodeCard';
import Button from '@components/Button';
import Xarrow, { Xwrapper, useXarrow } from 'react-xarrows';
import NewNode from '@components/Node/NewNode';
import { MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/solid';
import { updateStory } from '@http/self';
import { DocumentPlusIcon, MinusIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import DisplayNodes from './nodeDisplayer';
import Target from './target';

let tmpStoryGraph = [];

/* TODO add variable to the builder
  Add a oputut and outcom the the builder
*/
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
      {/*
      <div className="flex flex-row items-center h-16  bg-slate-700 px-20">
        <Button
          size="small"
          label="Add node"
          onClick={() => {
            setAddNewNodeModal(true);
          }}
        />
        <Button
          size="small"
          label="Edit"
          onClick={() => {
            setAddNewNodeModal(true);
          }}
        />

        <h1 className="text-2xl mx-auto">
          {story.title}
        </h1>
        <Button
          size="small"
          label="Go live"
          onClick={() => {
            setAddNewNodeModal(true);
          }}
        />
      </div> */}
      <div className="flex flex-row items-start justify-start">
        <div className="flex flex-col items-center  w-1/6 h-screen ">
          <div className="flex flex-row items-center h-16  bg-slate-700 w-full relative">
            <h1 className="text-lg mx-auto">
              {story.title}
            </h1>
            <PencilSquareIcon className="w-6 h-6 absolute top-5 right-5 cursor-pointer" />
          </div>
          <div className="flex flex-row justify-between items-center w-full px-5 pt-5">
            <h1 className="text-2xl">Nodes:</h1>
            <Button
              size="small"
              icon={<DocumentPlusIcon className="w-4 h-4 mr-2" />}
              label="Add"
              onClick={() => {
                setAddNewNodeModal(true);
              }}
            />
          </div>

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
          className="h-screen w-5/6 overflow-auto"
          onScroll={(e) => {
            updateXarrow();
          }}
        >
          <div className="absolute bottom-2 ml-3 flex flex-row bg-gray-500 rounded-xl p-2">
            <MagnifyingGlassMinusIcon
              className="w-7 h-7 mr-2 cursor-pointer"
              onClick={() => {
                setZoom((zoom) => {
                  const newZoom = parseFloat(zoom) - 10;
                  return `${newZoom}%`;
                });
              }}
            />
            <MinusIcon className=" w-7 h-7" />
            <MagnifyingGlassPlusIcon
              className="ml-2 w-7 h-7 cursor-pointer"
              onClick={() => {
                setZoom((zoom) => {
                  const newZoom = parseFloat(zoom) + 10;
                  return `${newZoom}%`;
                });
              }}
            />

          </div>
          <div
            className="bg-opacity-10"
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
            if (output.type === 'target' && !node.isSameOutcome) {
              return (
                <Xarrow
                  labels={<p className="text-xs  text-ellipsis w-7 te7-center">{output.value}</p>}
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
            if (node.isSameOutcome && node.outputs[0].id && node.outputs[0].type === 'target') {
              return (
                <Xarrow
                  labels={(
                    <div className="flex flex-col">
                      {node.outputs.map((o: any) => (
                        <p className="text-xs  text-ellipsis w-10 text-center">{`${o.value}`}</p>
                      ))}
                    </div>
                    )}
                  start={node.id}
                  end={node.outputs[0].id}
                  color="yellow"
                  key={`${node.outputs[0].id}`}
                />
              );
            }
          })}
          {storyGraph.length > 0 && storyGraph.map((node) => {
            if (node.input !== 'null') {
              return (
                <Xarrow
                  labels={<p className="text-xs  text-ellipsis w-10 text-center line-clamp-2">{node.question}</p>}
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
