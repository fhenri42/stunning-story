import React, { useState, useEffect } from 'react';
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import Button from '@components/Button';
import Modal from '@components/Modal';
import Input from '@components/Input';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { PencilIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';

import Divider from '@components/Divider';
import Switch from '@components/Switch';
import { createPage, updateStory } from 'http/self';
import { toast } from 'react-toastify';
import nodeCard from './nodeCard';

const initialSchema = createSchema({
  nodes: [
    {
      id: 'start',
      content: 'Story start',
      coordinates: [15, 15],
      outputs: [{ id: 'port-start', alignment: 'right' }],
    },
    {
      id: 'restart',
      content: 'Story restart',
      coordinates: [15, 85],
      inputs: [{ id: 'port-restart', alignment: 'right' }],
    },
    {
      id: 'end',
      content: 'Story end',
      coordinates: [15, 160],
      inputs: [{ id: 'port-end', alignment: 'right' }],
    },
  ],

});

export default function UncontrolledDiagram(props: any) {
  // create diagrams schema
  const { story } = props;
  const [buttonLoading, setButtonLoading] = useState(false);

  const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema);
  const [addNewNodeModal, setAddNewNodeModal] = useState(false);

  const [answers, setAnswers] = useState([null, null, null, null]);

  const deleteNodeFromSchema = (id) => {
    const nodeToRemove = schema.nodes.find((node) => node.id === id);
    removeNode(nodeToRemove);
  };

  useEffect(() => {
    window.onbeforeunload = function () {
      return 'Are you sure you want to leave?';
    };
  }, []);
  useEffect(() => {
    for (let index = 0; index < story.pages.data.length; index += 1) {
      const { attributes } = story.pages.data[index];
      console.log('Page =>', attributes);
      const nextNode: any = {
        id: `node-${schema.nodes.length + 1}`,
        content: attributes.slug,
        coordinates: [100, 100],
        data: { onClick: deleteNodeFromSchema, text: attributes.text },
        inputs: [{ id: attributes.slug }],
        outputs: attributes.answers, // answers.filter((e) => e !== null),
        render: nodeCard,

      };
      addNode(nextNode);
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

  const addNewNode = async (data) => {
    try {
      const nextNode: any = {
        id: `node-${schema.nodes.length + 1}`,
        content: data.slug,
        coordinates: [100, 100].join(','),
        data: { onClick: deleteNodeFromSchema, text: data.text },
        inputs: [{ id: data.slug }],
        outputs: answers.filter((e) => e !== null),
        render: nodeCard,

      };

      await createPage({
        ...data,
        coordinates: [100, 100],
        answers: answers.filter((e) => e !== null).map((e) => ({ answer: e.answer })),
      });
      await updateStory(data);
      addNode(nextNode);

      setAnswers([null, null, null, null]);

      setAddNewNodeModal(false);
      reset();
    } catch (error) {
      console.log('E =>', error);
      // TODO add good message
      toast.error('Slug must be unique');
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     await updateStorySchema(schema);
  //   })();
  //   console.log(schema);
  // }, [schema]);
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
      <Diagram schema={schema} onChange={onChange} />
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
            className="w-full"
            register={register}
            name="slug"
            placeholder="A unique slug like 'page-2'"
            required
            error={errors.slug ? 'Slug is required' : ''}
          />
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
