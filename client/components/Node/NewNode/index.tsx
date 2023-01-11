/* eslint-disable consistent-return */
import React, { useState } from 'react';
import Button from '@components/Button';
import { v4 as uuidv4 } from 'uuid';
import Modal from '@components/Modal';
import Input from '@components/Input';
import Divider from '@components/Divider';
import { useForm } from 'react-hook-form';
import { TrashIcon } from '@heroicons/react/24/solid';
import { fileUpload, updateStory } from '@http/self';
import Switch from '@components/Switch';
import { InputFile } from '@components/Input/inputFile';

export default function NewNode(props: any) {
  const {
    addNewNodeModal, setAddNewNodeModal, story, setStory,
  } = props;
  const [buttonLoading, setButtonLoading] = useState(false);
  const [outputs, setOutputs] = useState([]);
  const [isVictory, setIsVictory] = useState(false);
  const [isSameOutcome, setIsSameOutcome] = useState(false);
  const [image, setImage] = useState('');

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
      setButtonLoading(true);
      await updateStory({
        ...story,
        nodes: [...story.nodes, {
          ...data,
          isSameOutcome,
          isVictory,
          outputs,
          outputsNbr: outputs.length,
          sourceId: uuidv4(),
          bgUrl: image,
        }],
      });
      setStory({
        ...story,
        nodes: [...story.nodes, {
          ...data,
          outputs,
          isSameOutcome,
          isVictory,
          outputsNbr: outputs.length,
          sourceId: uuidv4(),
        }],
      });
      setAddNewNodeModal(false);
      setButtonLoading(false);

      reset();
    } catch (error) {
      console.log(error);
      setButtonLoading(false);

    //   toast.error('Slug must be unique');
    }
  };
  return (
    <Modal
      visible={addNewNodeModal}
      onCancel={() => { setAddNewNodeModal(false); }}
      bodyStyle={{
        backgroundColor: '#1B263B',
        width: '100%',
        position: 'relative',
        padding: '0',
      }}
    >
      {image !== '' && (
      <img className="absolute w-full h-full opacity-30 -z-10" src={image} alt="bg-node" />

      )}
      <form
        className="flex flex-col items-center justify-center w-full p-5"
        onSubmit={handleSubmit(addNewNode)}
      >
        <div className="flex flex-col w-full my-5">
          <p>
            Text
          </p>
          <Input
            className="w-full min-h-64"
            type="textarea"
            register={register}
            name="text"
            placeholder="The text displayed to the user"
            required
            error={errors.text ? 'text is required' : ''}
          />
        </div>
        {/* <input {...register('file', { required: true })} type="file" name="file" /> */}
        <div className="flex flex-col w-full mb-5">
          <p>
            Upload the image of your node:
          </p>
          <InputFile
            loading={buttonLoading}
            label="Upload image"
            onChange={async (formData) => {
              setButtonLoading(true);
              const data = await fileUpload(formData);
              setButtonLoading(false);

              setImage(data.url);
            }}
            allowMultipleFiles={false}
            uploadFileName="bg-image"
            className="w-2/6"
          />
        </div>

        <Divider />
        <div className="flex flex-row items-start justify-between w-full py-5">
          <div className="flex flex-col w-3/5">
            <p className="">
              Add to 4 output to your node:
            </p>
            {outputs.map((answer, key) => (
              <div className="flex flex-row items-center justify-center w-full mt-2 mb-2" key={answer.id}>
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
                  className="w-full"
                  placeholder={`Answer ${key}`}
                />
              </div>
            ))}
            {outputs.length > 0 && (
            <Switch
              checked={isSameOutcome}
              onChange={(e) => {
                setIsSameOutcome(e);
              }}
              label="Have the same outcome"
            />
            )}
          </div>

          <Button
            label="Add answer"
            className="w-2/6"
            disabled={outputs.length >= 4}
            onClick={() => {
              outputs.push({ id: uuidv4(), value: '' });
              setOutputs([...outputs]);
            }}
          />

        </div>

        <Divider />

        <div className="py-2 mt-3 flex flex-row items-center justify-between w-full">
          {outputs.length === 0 ? (
            <Switch
              checked={isVictory}
              onChange={(e) => {
                setIsVictory(e);
              }}
              label={isVictory ? 'Victory' : 'Defeat'}
            />
          ) : <div />}
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
