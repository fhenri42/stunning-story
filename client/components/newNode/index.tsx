/* eslint-disable consistent-return */
import React, { useState } from 'react';
import Button from '@components/Button';
import { v4 as uuidv4 } from 'uuid';
import Modal from '@components/Modal';
import Input from '@components/Input';
import Divider from '@components/Divider';
import { useForm } from 'react-hook-form';
import { TrashIcon } from '@heroicons/react/24/solid';
import { updateStory } from '@http/self';

export default function NewNode(props: any) {
  const { addNewNodeModal, setAddNewNodeModal, story } = props;
  const [buttonLoading, setButtonLoading] = useState(false);
  const [outputs, setAnswers] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      text: '',
    },
  });
  const addNewNode = async (data: any) => {
    try {
      console.log(data, outputs, story);
      await updateStory({
        ...story,
        nodes: [...story.nodes, {
          ...data,
          outputs,
          outputsNbr: outputs.length,
          sourceId: uuidv4(),
        }],
      });
      setAddNewNodeModal(false);
      reset();
    } catch (error) {
      console.log(error);
    //   toast.error('Slug must be unique');
    }
  };
  console.log('outputs =>', outputs);
  return (
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

        <div className="flex flex-row items-start justify-between w-full py-5">
          <div className="flex flex-col w-4/5 h-[200px]">
            {outputs.map((answer, key) => (
              <div className="flex flex-row items-center justify-center w-full mt-2" key={answer.id}>
                <TrashIcon
                  className="text-red-400 h-5 w-5 mr-2 cursor-pointer"
                  onClick={() => {
                    const index = outputs.findIndex((a) => a.id === answer.id);
                    console.log(index);
                    outputs.splice(index, 1);
                    setAnswers([...outputs]);
                  }}
                />
                <Input
                  onChange={(e) => {
                    const index = outputs.findIndex((a) => a.id === answer.id);
                    outputs[index].value = e.target.value;
                    setAnswers([...outputs]);
                  }}
                  value={answer.value}
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
              setAnswers([...outputs]);
            }}
          />

        </div>

        <Divider />

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
  );
}
