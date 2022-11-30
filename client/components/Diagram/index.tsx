import React, { useState, cloneElement } from 'react';
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import Button from '@components/Button';
import Modal from '@components/Modal';
import Input from '@components/Input';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';

const initialSchema = createSchema({
  nodes: [
    {
      id: 'node-1',
      content: 'Start of the story',
      coordinates: [150, 60],
      outputs: [{ id: 'port-1', alignment: 'right' }],
    },
  ],
});

function CustomRender({
  id, content, data, inputs, outputs,
}) {
  const [open, setOpen] = useState(false);
  console.log(outputs);

  return (
    <div className="bg-gray-300 w-[300px] h-[150px] rounded-lg">
      <div className="flex flex-row items-center justify-between">

        <Button label="Edit" size="small" onClick={() => setOpen(true)} />
        <XCircleIcon className="h-6 w-6" aria-hidden="true" onClick={() => data.onClick(id)} />

      </div>
      <div className="line-clamp-2 text-ellipsis p-5">
        {content}
      </div>
      <div className="flex flex-row items-center justify-between p-1">

        {inputs.map((port) => (
          <div className="flex flex-row items-center justify-center">
            {cloneElement(port, {
              style: {
                width: '25px', height: '25px', background: '#1B263B', borderRadius: '20px',
              },
            })}
            <p>Entry</p>
          </div>
        ))}
        <div className="flex flex-col items-center justify-evenly ">
          {outputs.map((port) => (
            <div className="flex flex-row items-center justify-center">
              <p className="line-clamp-2 text-ellipsis w-full">{port.props.value}</p>
              {cloneElement(port, {
                style: {
                  width: '25px', height: '25px', background: '#1B263B', borderRadius: '20px', margin: '5px',
                },
              })}
            </div>
          ))}

        </div>
      </div>
      <Modal visible={open} onCancel={() => { setOpen(false); }}>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Edit your node</h1>
        </div>

      </Modal>
    </div>

  );
}

export default function UncontrolledDiagram() {
  // create diagrams schema
  const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema);
  const [addNewNodeModal, setAddNewNodeModal] = useState(false);

  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [currentText, setCurrentText] = useState('');

  const deleteNodeFromSchema = (id) => {
    const nodeToRemove = schema.nodes.find((node) => node.id === id);
    removeNode(nodeToRemove);
  };

  const addNewNode = () => {
    const nextNode = {
      id: `node-${schema.nodes.length + 1}`,
      content: currentText,
      coordinates: [150, 150],
      render: CustomRender,
      data: { onClick: deleteNodeFromSchema },
      inputs: [{ id: `port-${Math.random()}` }],
      outputs: answers,
    };

    addNode(nextNode);
    setCurrentAnswer('');
    setAnswers([]);
    setAddNewNodeModal(false);
  };

  return (
    <div className="h-full w-full">
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

      <Diagram schema={schema} onChange={onChange} />
      <Modal
        visible={addNewNodeModal}
        onCancel={() => { setAddNewNodeModal(false); }}
        bodyStyle={{
          backgroundColor: '#1B263B',
        }}
        title="Add new node"
      >
        <div className="flex flex-col items-center justify-center">
          <Input
            label="text"
            onChange={(e) => {
              setCurrentText(e.target.value);
            }}
          />

          <Input
            onChange={(e) => {
              setCurrentAnswer(e.target.value);
            }}
            label="Add an new answer"
          />
          <Button
            label="Validate answer"
            onClick={() => {
              setAnswers([
                ...answers,
                {
                  id: `port-${Math.random()}`,
                  value: currentAnswer,
                },
              ]);
            }}
          />

          <p>Answers:</p>
          {answers.length > 0 && answers.map((answer, index) => (
            <p key={answer.id}>{`${index + 1}) ${answer.value}`}</p>
          ))}

          <Button
            label="Validate new node"
            onClick={() => {
              addNewNode();
            }}
          />
        </div>

      </Modal>
    </div>
  );
}
