/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { fileUpload, updateStory } from '@http/self';
import Button from '@components/Button';
import Modal from '@components/Modal';
import Input from '@components/Input';
import Switch from '@components/Switch';
import Divider from '@components/Divider';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { InputFile } from '@components/Input/inputFile';
import useTranslation from 'next-translate/useTranslation';

export default function EditNode(props: any) {
  const {
    editNodeModal,
    setEditNodeModal,
    story,
    node,
    setStory,
    tmpStoryGraph,
    forceUpadateStoryGraph,
  } = props;
  const { t } = useTranslation('common');

  const { sourceId } = node;
  const [buttonLoading, setButtonLoading] = useState(false);
  const [outputs, setOutputs] = useState(node.outputs);
  const [isVictory, setIsVictory] = useState(node.isVictory);
  const [image, setImage] = useState(node.bgUrl);
  const [audio, setAudio] = useState('');

  useEffect(() => {
    const indexStoryGraph = tmpStoryGraph.findIndex(
      (n: any) => n.sourceId === sourceId,
    );
    if (indexStoryGraph !== -1) {
      setOutputs(tmpStoryGraph[indexStoryGraph].outputs);
    }
  }, []);
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
    const indexInStoryGraph = tmpStoryGraph.findIndex((n:any) => n.sourceId === sourceId);
    if (indexInStoryGraph !== -1) {
      toast.error('You can not delete a node that is in the story graph');
      setButtonLoading(false);
      return;
    }
    story.nodes.splice(index, 1);

    await updateStory({
      ...story,
      nodes: [...story.nodes],
    });
    forceUpadateStoryGraph(story.id, tmpStoryGraph);
    setStory({
      ...story,
      nodes: [...story.nodes],
    });
  };

  const saveChange = async (data: any) => {
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
      const indexStoryGraph = tmpStoryGraph.findIndex((n:any) => n.sourceId === sourceId);

      if (indexStoryGraph !== -1) {
        tmpStoryGraph[indexStoryGraph] = {
          ...tmpStoryGraph[indexStoryGraph],
          ...data,
          isVictory,
          bgUrl: image,
          outputs,
          audio,
        };
      }
      await updateStory({
        ...story,
        nodes: [...story.nodes],
      });
      forceUpadateStoryGraph(story.id, tmpStoryGraph);
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
      onCancel={() => {
        setEditNodeModal(false);
      }}
      bodyStyle={{
        backgroundColor: '#1B263B',
        padding: '0px',
        width: '100%',
      }}
    >
      {image !== '' && (
        <img
          className="absolute w-full h-full opacity-30 "
          src={image}
          alt="node-bg"
        />
      )}
      <form
        className="flex flex-col items-center justify-center w-full p-5"
        onSubmit={handleSubmit(saveChange)}
      >
        <div className="flex flex-col w-full my-5">
          <p>{t('builder.edit_save_node.text')}</p>
          <Input
            className="w-full min-h-64"
            type="textarea"
            register={register}
            name="text"
            placeholder={t('builder.edit_save_node.text_placeholder')}
            required
            error={errors.text ? t('builder.edit_save_node.text_required') : ''}
          />
        </div>
        <div className="flex flex-col w-full mb-5">
          <p>{t('builder.edit_save_node.upload_audio')}</p>
          <InputFile
            loading={buttonLoading}
            label={t('builder.edit_save_node.upload_audio_button')}
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
          <p>{t('builder.edit_save_node.upload_image')}</p>
          <InputFile
            loading={buttonLoading}
            label={t('builder.edit_save_node.upload_image_button')}
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
            <p>{t('builder.edit_save_node.add_output')}</p>
            {outputs.map((output, key) => (
              <div
                className="flex flex-row items-center justify-center w-full mt-2 mb-2 z-10"
                key={output.id}
              >
                <Input
                  type="textarea"
                  onChange={(e) => {
                    const index = outputs.findIndex((a) => a.id === output.id);
                    outputs[index].value = e.target.value;
                    setOutputs([...outputs]);
                  }}
                  defaultValue={output.value}
                  className="w-full"
                  placeholder={`${t('builder.edit_save_node.answer')} ${key}`}
                />
              </div>
            ))}
          </div>
        </div>

        <Divider />
        <div className="flex flex-row items-center justify-between w-full  py-2 mt-3">
          <Button
            loading={buttonLoading}
            type="danger"
            onClick={removeNode}
            label={t('builder.edit_save_node.remove_node')}
            size="medium"
          />
          {outputs.length === 0 ? (
            <Switch
              checked={isVictory}
              onChange={(e) => {
                setIsVictory(e);
              }}
              label={
                isVictory
                  ? t('builder.edit_save_node.victory')
                  : t('builder.edit_save_node.defeat')
              }
            />
          ) : (
            <div />
          )}
          <Button
            loading={buttonLoading}
            type="primary"
            htmlType="submit"
            label={t('builder.edit_save_node.save')}
            size="medium"
          />
        </div>
      </form>
    </Modal>
  );
}
