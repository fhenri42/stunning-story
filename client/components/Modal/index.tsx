/* eslint-disable jsx-a11y/no-static-element-interactions */
/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/24/solid';

export default function Modal(props: {
  children: any;
  onCancel: any;
  visible: boolean;
  width?: string;
  bodyStyle?: any;
  title?: string;
  iconColor?: string;
  closable?: boolean;
  noClickOut?: boolean;
  bgUrl?: string;
  bodyMain?: any;
}) {
  const {
    children,
    visible,
    onCancel,
    width,
    bodyStyle,
    title,
    iconColor,
    closable = true,
    noClickOut = false,
    bgUrl,
    bodyMain,
  } = props;

  return (
    <Transition.Root show={visible || false} as={Fragment}>
      <Dialog
        as="div"
        className="relative"
        style={{ zIndex: 200 }}
        onClose={
          noClickOut
            ? () => {
              console.log('No close');
            }
            : onCancel
        }
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                style={{ width, ...bodyMain }}
                className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-1/2"
              >
                {/* {bgUrl && (
                  <img
                    className="absolute w-full h-full"
                    src={bgUrl}
                    alt={bgUrl}
                    width={1080}
                    style={{ zIndex: -1 }}
                  />
                )} */}
                <div
                  className="px-4 pt-5 pb-4 z-50 w-full"
                  style={{ ...bodyStyle }}
                >
                  {title && (
                    <Dialog.Title
                      as="h3"
                      className="text-lg text-center leading-6 font-medium text-white pb-4 z-50"
                    >
                      {title}
                    </Dialog.Title>
                  )}
                  {closable && (
                    <div className="hidden sm:block absolute top-2 right-2 z-50">
                      <span
                        className={`${
                          iconColor || 'text-gray-400'
                        } hover:text-gray-500 focus:outline-none`}
                        onClick={onCancel}
                      >
                        <XCircleIcon className="h-6 w-6" aria-hidden="true" />
                      </span>
                    </div>
                  )}

                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
