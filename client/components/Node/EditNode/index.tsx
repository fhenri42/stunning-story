/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { fileUpload, updateStory } from '@http/self';
import Button from '@components/Button';
import { v4 as uuidv4 } from 'uuid';
import Modal from '@components/Modal';
import Input from '@components/Input';
import Switch from '@components/Switch';
import Divider from '@components/Divider';
import { useForm } from 'react-hook-form';
import { TrashIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import { InputFile } from '@components/Input/inputFile';

export default function EditNode(props: any) {
  const {
    editNodeModal, setEditNodeModal, story, node, setStory,
  } = props;
  const { sourceId } = node;
  const [buttonLoading, setButtonLoading] = useState(false);
  const [outputs, setOutputs] = useState(node.outputs);
  const [isVictory, setIsVictory] = useState(node.isVictory);
  const [image, setImage] = useState(node.bgUrl);
  const [audio, setAudio] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      text: node.text,

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
        isVictory,
        outputs,
        sourceId,
        outputsNbr: outputs.length,
        bgUrl: image,
        audio,
      };
      const indexStoryGraph = story.storyGraph.findIndex((n:any) => n.sourceId === sourceId);

      if (indexStoryGraph !== -1) {
        story.storyGraph[indexStoryGraph] = {
          ...story.storyGraph[indexStoryGraph],
          ...data,
          isVictory,
          bgUrl: image,
          audio,
        };
      }
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
        padding: '0px',
        width: '100%',
      }}
    >
      {image !== '' && (
        <img className="absolute w-full h-full opacity-30 " src={image} alt="node-bg" />
      )}
      <form
        className="flex flex-col items-center justify-center w-full p-5"
        onSubmit={handleSubmit(editNode)}
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
        <div className="flex flex-col w-full mb-5">
          <p>
            Upload an audio file read by the narrator:
          </p>
          <InputFile
            loading={buttonLoading}
            label="Upload audio"
            onChange={async (formData) => {
              setButtonLoading(true);
              const data = await fileUpload(formData);
              setButtonLoading(false);
              setAudio(data.url);
            }}
            allowMultipleFiles={false}
            uploadFileName="bg-image"
            className="w-2/6"
          />
        </div>
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
            {outputs.map((output, key) => (
              <div className="flex flex-row items-center justify-center w-full mt-2 mb-2 z-10" key={output.id}>
                <TrashIcon
                  className="text-red-400 h-5 w-5 mr-2 cursor-pointer"
                  onClick={() => {
                    const index = outputs.findIndex((a) => a.id === output.id);
                    outputs.splice(index, 1);
                    setOutputs([...outputs]);
                  }}
                />
                <Input
                  onChange={(e) => {
                    const index = outputs.findIndex((a) => a.id === output.id);
                    outputs[index].value = e.target.value;
                    setOutputs([...outputs]);
                  }}
                  defaultValue={output.value}
                  className="w-full"
                  placeholder={`Answer ${key}`}
                />
              </div>
            ))}
          </div>

          <Button
            label="Add output"
            className="w-2/6"
            disabled={outputs.length >= 4}
            onClick={() => {
              outputs.push({ id: uuidv4(), value: '' });
              setOutputs([...outputs]);
            }}
          />

        </div>

        <Divider />
        <div className="flex flex-row items-center justify-between w-full  py-2 mt-3">
          <Button
            loading={buttonLoading}
            type="danger"
            onClick={removeNode}
            label="Remove node"
            size="medium"
          />
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
            label="Edit node"
            size="medium"
          />
        </div>

      </form>

    </Modal>
  );
}
