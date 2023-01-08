/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { updateStory } from '@http/self';
import Button from '@components/Button';
import { v4 as uuidv4 } from 'uuid';
import Modal from '@components/Modal';
import Input from '@components/Input';
import Switch from '@components/Switch';
import Divider from '@components/Divider';
import { useForm } from 'react-hook-form';
import { TrashIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

export default function EditNode(props: any) {
  const {
    editNodeModal, setEditNodeModal, story, text, setStory, sourceId,
  } = props;
  const [buttonLoading, setButtonLoading] = useState(false);
  const [outputs, setOutputs] = useState(props.outputs);
  const [isVictory, setIsVictory] = useState(props.isVictory);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      text,

    },
  });
  const removeNode = async () => {
    setButtonLoading(true);
    const index = story.nodes.findIndex((n:any) => n.sourceId === sourceId);
    story.nodes.splice(index, 1);
    await updateStory({
      ...story,
      nodes: [...story.nodes],
    });
    setStory({
      ...story,
      nodes: [...story.nodes],
    });
  };
  const editNode = async (data: any) => {
    try {
      setButtonLoading(true);
      const index = story.nodes.findIndex((n:any) => n.sourceId === sourceId);
      story.nodes[index] = {
        ...data,
        outputs,
        outputsNbr: outputs.length,
      };
      await updateStory({
        ...story,
        nodes: [...story.nodes],
      });
      setStory({
        ...story,
        nodes: [...story.nodes],
      });
      setEditNodeModal(false);
      setButtonLoading(false);

      reset();
    } catch (error) {
      console.log(error);
      setButtonLoading(false);
      toast.error('Error on updating node');
    }
  };
  return (
    <Modal
      visible={editNodeModal}
      onCancel={() => { setEditNodeModal(false); }}
      bodyStyle={{
        backgroundColor: '#1B263B',
        width: '100%',
      }}
      title="Add new node"
    >
      <form
        className="flex flex-col items-center justify-center w-full"
        onSubmit={handleSubmit(editNode)}
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

        <div className="flex flex-row items-start justify-between w-full py-5">
          <div className="flex flex-col w-4/5 h-[200px]">
            {outputs.map((answer, key) => (
              <div className="flex flex-row items-center justify-center w-full mt-2" key={answer.id}>
                <TrashIcon
                  className="text-red-400 h-5 w-5 mr-2 cursor-pointer"
                  onClick={() => {
                    const index = outputs.findIndex((a) => a.id === answer.id);
                    outputs.splice(index, 1);
                    setOutputs([...outputs]);
                  }}
                />
                <Input
                  onChange={(e) => {
                    const index = outputs.findIndex((a) => a.id === answer.id);
                    outputs[index].value = e.target.value;
                    setOutputs([...outputs]);
                  }}
                  defaultValue={answer.value}
                  className="w-full"
                  placeholder={`Answer ${key}`}
                />
              </div>
            ))}
          </div>

          <Button
            label="Add answer"
            disabled={outputs.length >= 4}
            onClick={() => {
              outputs.push({ id: uuidv4(), value: '' });
              setOutputs([...outputs]);
            }}
          />

        </div>
        {outputs.length === 0 && (
        <Switch
          checked={isVictory}
          onChange={(e) => {
            setIsVictory(e);
          }}
          label={isVictory ? 'Defeat' : 'Victory'}
        />
        )}
        <Divider />

        <div className="flex flex-row items-center justify-between w-full  py-2 mt-3">
          <Button
            loading={buttonLoading}
            type="danger"
            onClick={removeNode}
            label="Remove node"
            size="medium"
          />
          <Button
            loading={buttonLoading}
            type="primary"
            htmlType="submit"
            label="Edit node"
            size="medium"
          />
        </div>

      </form>

    </Modal>
  );
}
