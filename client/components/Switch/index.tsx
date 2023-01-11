import React, { useState } from 'react';
import { Switch as Toggle } from '@headlessui/react';

interface ISwitch {
  checked?: boolean;
  onChange?: any;
  label?: any;
  color?: string;
  colorEnabled?: string;
}

export default function Switch(props: ISwitch) {
  const {
    checked,
    onChange,
    label,
    colorEnabled = 'bg-orange-600',
    color = 'bg-gray-200',
  } = props;
  const [enabled, setEnabled] = useState(checked);

  const handleSwitch = (e) => {
    onChange(e);
    setEnabled(!enabled);
  };

  return (
    <Toggle.Group>
      <div className="flex items-start">
        {label && <Toggle.Label className="mr-4">{label}</Toggle.Label>}
        <Toggle
          checked={enabled}
          onChange={handleSwitch}
          className={`${
            enabled ? colorEnabled : color
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Toggle>
      </div>
    </Toggle.Group>
  );
}
