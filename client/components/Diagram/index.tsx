/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
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

export default function CustomDiagram(props: any) {
  // create diagrams schema
  const { story } = props;
  const [storyGraph, setSoryGraph] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);
  const [nodes, setNodes] = useState([]);
  // const [schema, {
  //   onChange, addNode, removeNode,
  // }] = useSchema({ nodes: [] });
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
        id: attributes.slug,
        content: attributes.slug,
        coordinates: attributes.coordinates,
        data: { onClick: deleteNodeFromSchema, text: attributes.text },
        inputs: [{ id: attributes.slug }],
        outputs: attributes.answers.map((e:any) => ({ answer: e.answer, id: e.node_id })),
        // render: nodeCard,
      };
      setNodes([...nodes, nextNode]);
    }
    // addNode(nextNode);

    // schema.links = story.links;
    // window.onbeforeunload = function () {
    //   return 'Are you sure you want to leave?';
    // };
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
        // id: `node-${schema.nodes.length + 1}`,
        content: data.slug,
        coordinates: [100, 100],
        data: { onClick: deleteNodeFromSchema, text: data.text },
        inputs: [{ id: data.slug }],
        outputs: answers.filter((e) => e !== null),
        // render: nodeCard,

      };
      await createPage({
        ...data,
        coordinates: [100, 100].join(','),
        answers: answers.filter((e) => e !== null).map((e) => ({ answer: e.answer, node_id: e.id })),
        story_slug: story.slug,
      });
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

  // useEffect(() => {
  //   setInterval(() => {
  //     for (let index = 0; index < schema.nodes.length; index += 1) {
  //       const page = schema.nodes[index];
  //       updatePage({
  //         // ...page,
  //         slug: page.content,
  //         coordinates: page.coordinates.join(','),

  //       });
  //     }
  //   }, 3000);
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     console.log(schema.links);
  //     await updateStory({
  //       slug: story.slug,
  //       links: schema.links,
  //     });
  //   })();
  // }, [schema.links]);
  const addingNode = (item, path, answerIndex) => {
    console.log('item= >', item);
    const _storyGraph = { ...storyGraph };

    if (!storyGraph.nodes) {
      console.log('ICIC MAN');
      _storyGraph.nodes = [{
        node: item,
        answers: [
          { type: 'answer', value: 1, id: Math.random() },
          { type: 'answer', value: 1, id: Math.random() },

        ],
      }];
      console.log('This work no ? ');
      setSoryGraph(_storyGraph);
      return;
    }
    console.log(_storyGraph);
    console.log(path);
    // debugger;
    console.log(answerIndex);
    let request = path;

    request += `.answers[${answerIndex}]`;
    console.log([request]);

    _.set(
      _storyGraph,
      request,
      {
        type: 'node',
        node: item,
        answers: [
          { type: 'answer', value: 1, id: Math.random() },
          { type: 'answer', value: 1, id: Math.random() },

        ],
      },
    );

    setSoryGraph(_storyGraph);
  };

  console.log(storyGraph);
  const grapRecursif = (n: any, path: number) => {
    /* Sa c'est le return de basse
    Si dans le n l'answer c'est un target on renvoi sa
    Si no on renvoi une Nade avec c'set target
*/
    console.log('Recursif n =>', n);
    return (
      <div key={n.node.id} className="flex flex-row items-center">
        <NodeCard {...n.node} />

        <div key={n.node.id} className="flex flex-col">
          {n.answers && n.answers.map((e: any, answerIndex: number) => {
            if (e.type === 'node') {
              return grapRecursif(e, `${path}.answers[${answerIndex}]`);
            }
            return (
              <Target
                key={e.id}
                path={path}
                answerIndex={answerIndex}
                addingNode={addingNode}
              />
            );
          })}
        </div>
      </div>
    );
  };
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

          <div className="flex flex-col items-center justify-start w-[15%] bg-green-400 h-screen">
            {nodes.map((node: any) => <NodeCard {...node} />)}
          </div>
          <div className="w-[85%] bg-red-400 h-screen">
            {!storyGraph.nodes && (
            <Target
              addingNode={addingNode}
            />
            )}

            <div className="flex flex-row items-center">

              {storyGraph.nodes && grapRecursif(storyGraph.nodes[0], 'nodes[0]') }
            </div>
          </div>
        </div>
      </DndProvider>
      {/* <Diagram schema={schema} onChange={onChange} />

      storyGraph.nodes.map((n: any) => (
                <div key={n.node.id} className="flex flex-row items-center">
                  <NodeCard {...n.node} />

                  <div key={n.node.id} className="flex flex-col">

                    {n.answers && n.answers.map((e) => (
                      <Target
                        key={e}
                        addingNode={addingNode}
                      />
                    )) }
                  </div>
                </div>
              ))
      */}
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
          {/* <Input
            disabled
            className="w-full"
            register={register}
            name="slug"
            placeholder="A unique slug like 'page-2'"
            required
            error={errors.slug ? 'Slug is required' : ''}
          /> */}
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
