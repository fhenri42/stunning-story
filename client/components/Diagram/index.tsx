/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import NodeCard from '@components/Diagram/nodeCard';
import Button from '@components/Button';
import Xarrow, { Xwrapper, useXarrow } from 'react-xarrows';
import NewNode from '@components/Node/NewNode';
import { MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/solid';
import { updateOnlyStoryGraph } from '@http/self';
import {
  ArrowLeftIcon,
  DocumentPlusIcon, MinusIcon, PencilSquareIcon, TrashIcon,
} from '@heroicons/react/24/outline';
import EditStory from '@components/Story/EditStory';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import DisplayNodes from './displayNode';
import Target from './target';
import TopMenu from './topMenu';

let tmpStoryGraph: any = [];

/*
Fix firs time use node bug.
Eiting a node edit all node, Check if the answer can be remove.
A node can connect back to the story.
*/

/*
Perso
hp de base :
combat de base :
argent de base :
*/
/*
Tu construit un item.
  item:{
    valeur:
    dmg:
    bonusHp:
    type: only one type of items
  },
  ennemi:
  {
    hp:
    dmg:
  }
Quand tu ajoute une reponse tu peut ajoute un loot: 1 item ou n item mais alors il sont pris de facon radome.
Quand tu ajoute une reponse tu peut ajoute un combat: 1 ennemi ou N ennemi.

*/
export default function Diagram(props: any) {
  const { t } = useTranslation('common');

  const [story, setStory] = useState(props.story);
  const updateXarrow = useXarrow();
  const [storyGraph, setStoryGraph] = useState(story.storyGraph || []);
  const [addNewNodeModal, setAddNewNodeModal] = useState(false);
  const [openModalStory, setOpenModalStory] = useState(false);
  const [editNodeModal, setEditNodeModal] = useState(false);

  const [zoom, setZoom] = useState('100%');
  const forceUpadateStoryGraph = async (id, data) => {
    await updateOnlyStoryGraph({
      id,
      storyGraph: data,
    });
    setStoryGraph([...data]);
  };

  const addingNode = (node: any, targetId: any) => {
    try {
      const indexSourceId = tmpStoryGraph.findIndex((n: any) => n.sourceId === node.sourceId);
      if (node.input !== 'null') {
        const indexInput = tmpStoryGraph.findIndex((n: any) => n.sourceId === node.input);
        if (indexInput !== -1) {
          const outputIndex = tmpStoryGraph[indexInput]
            .outputs.findIndex((n: any) => n.id === targetId);
          if (outputIndex === -1) return;
          tmpStoryGraph[indexInput].outputs[outputIndex].id = targetId;
          tmpStoryGraph[indexInput].outputs[outputIndex].sourceId = node.sourceId;
          tmpStoryGraph[indexInput].outputs[outputIndex].type = 'node';
          if (indexSourceId !== -1) {
            tmpStoryGraph[indexInput].outputs[outputIndex].canBeRemove = true;
          }
        }
      }

      if (indexSourceId !== -1) {
        tmpStoryGraph = [...tmpStoryGraph];
        forceUpadateStoryGraph(story.id, tmpStoryGraph);
        return;
      }
      tmpStoryGraph = [...tmpStoryGraph, { ...node }];
      forceUpadateStoryGraph(story.id, tmpStoryGraph);
    } catch (error) {
      console.log(error);
    }
  };
  const cheackIfCanRemove = (sourceId: any) => {
    for (let index = 0; index < tmpStoryGraph.length; index += 1) {
      const node = tmpStoryGraph[index];
      const outputIndex = node.outputs.findIndex((o) => o.sourceId === sourceId && o.type === 'node' && o.canBeRemove);
      if (outputIndex !== -1) {
        return false;
      }
    }
    return true;
  };
  const removeNode = (sourceId: any) => {
    if (!cheackIfCanRemove(sourceId)) return;

    const index = tmpStoryGraph.findIndex((n:any) => n.sourceId === sourceId);
    if (index !== -1) {
      const indexParent = tmpStoryGraph.findIndex(
        (n:any) => n.sourceId === tmpStoryGraph[index].input,
      );

      if (indexParent !== -1) {
        const indexOutput = tmpStoryGraph[indexParent]
          .outputs.findIndex((n:any) => n.sourceId === sourceId);

        tmpStoryGraph[indexParent].outputs[indexOutput].type = 'target';
        delete (tmpStoryGraph[indexParent].outputs[indexOutput].sourceId);
      }
      tmpStoryGraph.splice(index, 1);

      forceUpadateStoryGraph(story.id, tmpStoryGraph);
    }
  };

  const removeDupicateNode = (nodeId: any, outputIndex) => {
    const index = tmpStoryGraph.findIndex((n:any) => n.sourceId === nodeId);
    if (index !== -1) {
      tmpStoryGraph[index].outputs[outputIndex].type = 'target';
      delete (tmpStoryGraph[index].outputs[outputIndex].sourceId);
      forceUpadateStoryGraph(story.id, tmpStoryGraph);
    }
  };
  useEffect(() => {
    if (story.storyGraph) {
      tmpStoryGraph = story.storyGraph;
      setStoryGraph([...story.storyGraph]);
    }
  }, []);

  return (
    <div className="overflow-x-hidden">
      <div className="flex flex-row items-start justify-start z-50 overflow-hidden">
        <div className="flex flex-col items-center w-1/6 h-screen z-50">
          <div className="flex flex-row items-center justify-evenly h-16 z-50 bg-slate-700 w-full">
            <Link href="/builder">
              <ArrowLeftIcon className="w-6 h-6  cursor-pointer" />
            </Link>

            <h1 className="text-lg w-[70%] text-ellipsis overflow-hidden line-clamp-1">
              {story.title}
            </h1>
            <PencilSquareIcon
              onClick={() => {
                setOpenModalStory(true);
              }}
              className="w-6 h-6  cursor-pointer"
            />
          </div>
          <div className="flex flex-row justify-between items-center w-full px-5 pt-5">
            <h1 className="text-2xl">{t('builder.nodes')}</h1>
            <Button
              size="small"
              icon={<DocumentPlusIcon className="w-4 h-4 mr-2" />}
              label="Add"
              onClick={() => {
                setAddNewNodeModal(true);
              }}
            />
          </div>
          <div className="overflow-auto overflow-x-hidden w-full pb-20">
            {!editNodeModal
              && story.nodes.length > 0
              && story.nodes.map((node) => (
                <NodeCard
                  key={node.sourceId}
                  node={node}
                  story={story}
                  setStory={setStory}
                  tmpStoryGraph={tmpStoryGraph}
                  editNodeModal={editNodeModal}
                  setEditNodeModal={setEditNodeModal}
                  forceUpadateStoryGraph={forceUpadateStoryGraph}
                />
              ))}
          </div>
        </div>
        <div
          className="h-screen w-5/6 overflow-auto"
          onScroll={() => {
            updateXarrow();
          }}
        >
          <TopMenu
            forceUpadateStoryGraph={forceUpadateStoryGraph}
            story={story}
            setStory={setStory}
            storyGraph={
              tmpStoryGraph.length > 0 ? tmpStoryGraph : story.storyGraph
            }
          />

          <div className="absolute bottom-2 ml-3 flex flex-row bg-gray-500 rounded-xl p-2 z-50">
            <MagnifyingGlassMinusIcon
              className="w-7 h-7 mr-2 cursor-pointer"
              onClick={() => {
                setZoom((value) => {
                  const newZoom = parseFloat(value) - 10;
                  return `${newZoom}%`;
                });
              }}
            />
            <MinusIcon className=" w-7 h-7" />
            <MagnifyingGlassPlusIcon
              className="ml-2 w-7 h-7 cursor-pointer"
              onClick={() => {
                setZoom((value) => {
                  const newZoom = parseFloat(value) + 10;
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
            ) : (
              <Target input="null" addingNode={addingNode} />
            )}
          </div>
          <div className="absolute bg-grid opacity-50 top-0 w-5/6" />
        </div>
      </div>
      <div
        style={{
          zoom,
        }}
      >
        <Xwrapper>
          {storyGraph.length > 0
            && storyGraph.map((node: any) => node.outputs.map((output: any, outputIndex: number) => {
              if (output.type === 'target') {
                return (
                  <Xarrow
                    labels={(
                      <p className="text-xs  text-ellipsis w-20 text-center line-clamp-2">
                        {output.value}
                      </p>
                      )}
                    start={node.sourceId}
                    end={output.id}
                    color="green"
                    key={`${output.id}`}
                  />
                );
              }
              if (output.type === 'node') {
                return (
                  <Xarrow
                    labels={(
                      <div className="flex flex-row items-center justify-center w-20">
                        {output.canBeRemove && (
                        <TrashIcon
                          className="text-red-400 h-7 w-7 mr-2 cursor-pointer z-50"
                          onClick={() => {
                            removeDupicateNode(node.sourceId, outputIndex);
                          }}
                        />
                        )}
                        <p className="text-xs  text-ellipsis  text-center line-clamp-2">
                          {output.value}
                        </p>
                      </div>
                      )}
                    start={node.sourceId}
                    end={output.sourceId}
                    color="purple"
                    key={`${output.id}`}
                  />
                );
              }

              return null;
            }))}
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
      {openModalStory && (
        <EditStory
          story={story}
          setStory={setStory}
          openModalStory={openModalStory}
          setOpenModalStory={setOpenModalStory}
        />
      )}
    </div>
  );
}
