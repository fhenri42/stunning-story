/* eslint-disable max-len */
import React, { useState, useEffect, use } from 'react';
import Button from '@components/Button';
import Modal from '@components/Modal';
import Input from '@components/Input';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import Divider from '@components/Divider';
import Switch from '@components/Switch';
import {
  createPage, deletePage, updatePage, updateStory,
} from 'http/self';
import { toast } from 'react-toastify';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import _ from 'loadsh';
import NodeCard from './nodeCard';
import Target from './target';

// TODO Refaire tout le modele de donner avec des id est non c'est array imbriquer
// Faire du style pour que sa soir plus claire
// Faire une histoire avec GPT-3

export default function CustomDiagram(props: any) {
  // create diagrams schema
  const { story } = props;
  const [storyGraph, setSoryGraph] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [addNewNodeModal, setAddNewNodeModal] = useState(false);

  const [answers, setAnswers] = useState([null, null, null, null]);

  const deleteNodeFromSchema = async (id: string) => {
    const nodeToRemove = schema.nodes.find((node) => node.id === id);
    removeNode(nodeToRemove);
    await deletePage(nodeToRemove?.content);
    await updateStory({
      slug: story.slug,
      links: schema.links || [],
    });
  };

  useEffect(() => {
    for (let index = 0; index < story.pages.length; index += 1) {
      const { attributes } = story.pages[index];
      const nextNode: any = {
        id: uuidv4(), // attributes.slug,
        content: attributes.slug,
        coordinates: attributes.coordinates,
        data: { onClick: deleteNodeFromSchema, text: attributes.text },
        outputs: [], // attributes.answers.map((e:any) => e.node_id),
        // render: nodeCard,
      };
      setNodes([...nodes, nextNode]);
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      slug: '',
      text: '',
    },
  });

  const addNewNode = async (data: any) => {
    try {
      data.slug = uuidv4();
      const nextNode: any = {
        content: data.slug,
        coordinates: [100, 100],
        data: { onClick: deleteNodeFromSchema, text: data.text },
        outputs: answers.filter((e) => e !== null),
      };
      // await createPage({
      //   ...data,
      //   coordinates: [100, 100].join(','),
      //   answers: answers.filter((e) => e !== null).map((e) => ({ answer: e.answer, node_id: e.id })),
      //   story_slug: story.slug,
      // });
      setNodes([...nodes, nextNode]);

      setAnswers([null, null, null, null]);

      setAddNewNodeModal(false);
      reset();
    } catch (error) {
      console.log(error);
      // TODO add good message
      toast.error('Slug must be unique');
    }
  };

  const addNodesToGraph = (newNode) => {
    console.log('newNode,', newNode);
    const tmpNode = { ...newNode };
    const tmpStoryGraph = [...storyGraph];
    // console.log(newNode.input);
    // const indexInput = tmpStoryGraph.findIndex((n) => n.id === newNode.input);
    // console.log(indexInput);
    // if (indexInput !== -1) {
    //   console.log('icic avec le -1 ? ');
    //   tmpStoryGraph[indexInput].outputs.push(newNode.id);
    // }
    tmpStoryGraph.push(tmpNode);
    console.log('tmpStoryGraph,', tmpStoryGraph);

    setSoryGraph(tmpStoryGraph);
  };
  const displayNodes = (currentNode: any) => (
    <div className="flex flex-row items-center justify-start relative">
      {currentNode.outputs.length === 0 ? (
        <>
          <NodeCard id={currentNode.id} {...currentNode} />
          {/* <div id={currentNode.id} className="bg-blue-400 p-2 ml-14 mt-10">{currentNode.data.text}</div> */}
          <div className="flex flex-col">
            <Target id={`${currentNode.id}_target_0`} input={currentNode.id} addingNode={addNodesToGraph} />
            <Target id={`${currentNode.id}_target_1`} input={currentNode.id} addingNode={addNodesToGraph} />

          </div>
        </>
      ) : (
        <>
          <NodeCard id={currentNode.id} {...currentNode} />
          {/* <div id={currentNode.id} className="bg-blue-400 p-2 ml-14 mt-10">{currentNode.data.text}</div> */}
          <div className="flex flex-col">
            {currentNode.outputs.map((output: any) => {
              const outputIndex = storyGraph.findIndex((n) => n.id === output);
              return displayNodes(storyGraph[outputIndex]);
            })}
          </div>
        </>
      )}
    </div>
  );
  console.log(storyGraph);
  return (
    <div
      className="h-full w-full"
    >
      <div
        className="flex items-end justify-end"
      >
        <Button
          onClick={() => {
            setAddNewNodeModal(true);
          }}
          label="Add new node"
        />
      </div>
      {/* Work-space */}
      <Divider />
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-row items-center justify-center">

          <div className="flex flex-col items-center justify-start w-[10%] bg-green-400 h-screen">
            {nodes.map((node: any) => <NodeCard key={node.id} {...node} />)}
          </div>
          <div className="w-[90%] bg-red-400 h-screen">
            {storyGraph.length === 0 && (<Target input="null" addingNode={addNodesToGraph} />)}
            <div className="flex flex-row items-center">
              {storyGraph.length > 0 && displayNodes(storyGraph[0]) }
            </div>
          </div>
        </div>
      </DndProvider>
      {addNewNodeModal && (
      <Modal
        visible={addNewNodeModal}
        onCancel={() => { setAddNewNodeModal(false); }}
        bodyStyle={{
          backgroundColor: '#1B263B',
          width: '100%',
        }}
        title="Add new node"
      >
        <form
          className="flex flex-col items-center justify-center w-full"
          onSubmit={handleSubmit(addNewNode)}
        >
          <Input
            className="w-full min-h-64"
            type="textarea"
            register={register}
            name="text"
            placeholder="The text displayed to the user"
            required
            error={errors.text ? 'text is required' : ''}
          />

          <Divider />
          Create your answers:
          {[0, 1, 2, 3].map((index) => (
            <div className="flex flex-row items-center justify-center w-full" key={index}>

              <Input
                className="w-full mr-5 mb-2"
                disabled={answers[index] === null}
                onChange={(e) => {
                  if (answers[index] !== null) {
                    const newAnswers = answers;
                    newAnswers[index].answer = e.target.value;
                    setAnswers([
                      ...newAnswers]);
                  }
                }}
                placeholder={`Answer ${index + 1}`}
              />
              <Switch
                onChange={(e) => {
                  if (answers[index] === null) {
                    const newAnswers = answers;
                    newAnswers[index] = { id: `port-${Math.random()}` };
                    setAnswers([
                      ...newAnswers]);
                    return;
                  }
                  const newAnswers = answers;
                  newAnswers[index] = null;
                  setAnswers([
                    ...newAnswers]);
                }}
              />
            </div>
          ))}

          <div className="py-2 mt-3">
            <Button
              loading={buttonLoading}
              type="primary"
              htmlType="submit"
              label="Create"
              size="medium"
            />
          </div>

        </form>

      </Modal>
      )}

    </div>
  );
}
