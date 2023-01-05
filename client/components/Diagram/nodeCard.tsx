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
  sourceId, text, input, outputs, outputsNbr,
}: any) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      item: {
        text, input, outputs, outputsNbr,
      },
      type: 'blue',
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [],
  );
  return (

    <div key={sourceId} ref={drag} className="bg-blue-400 p-2 my-2 mx-2 rounded-lg">
      <p className="text-black text-xs line-clamp-2 text-ellipsis">
        {text}
      </p>

      {/* <Modal visible={open} onCancel={() => { setOpen(false); }}>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Edit your node</h1>
        </div>

      </Modal> */}
    </div>

  );
}
