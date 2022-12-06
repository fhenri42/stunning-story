import React, { useState, cloneElement, useEffect } from 'react';
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import Button from '@components/Button';
import Modal from '@components/Modal';
import Input from '@components/Input';
import { useDrag } from 'react-dnd';

import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { PencilIcon } from '@heroicons/react/24/solid';
import Divider from '@components/Divider';

export default function NodeCard({
  id, content, data, inputs, outputs,
}: any) {
  const [forbidDrag, setForbidDrag] = useState(false);
  const [open, setOpen] = useState(false);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      item: {
        id, content, data, inputs, outputs,
      },
      type: 'blue',
      canDrag: !forbidDrag,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [forbidDrag, 'blue'],
  );

  return (

    <div ref={drag} className="w-[170px] h-[110px] bg-gray-300 rounded flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <p className="text-black text-xs line-clamp-2 text-ellipsis">
          {data.text}
        </p>
        <div className="flex flex-row">
          <PencilIcon className=" h-4 w-4 text-black" onClick={() => setOpen(true)} />
          <XCircleIcon className=" h-4 w-4 text-black" onClick={() => data.onClick(id)} />
        </div>
      </div>

      <Divider />
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col justify-start items-start">

          {/* {inputs.map((port) => (
            <div className="flex flex-col items-start justify-start w-3/4">

              <div className="flex flex-row items-center justify-center pt-1">

                {cloneElement(port, {
                  style: {
                    width: '15px', height: '15px', background: '#1B263B',
                  },
                })}
                <p className="text-xs text-black p-0 m-0">Entry</p>

              </div>
            </div>

          ))} */}
        </div>

        <div className="flex flex-col justify-between mt-auto">

          {/* {outputs.map((port, key) => (
            <div className="flex flex-row justify-center items-center">
              <p className="text-xs text-black p-0 m-0">
                {key + 1}
                )
              </p>

              {cloneElement(port, {
                style: {
                  width: '15px', height: '15px', background: '#1B263B', margin: '2px',
                },
              })}
            </div>
          ))} */}

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
