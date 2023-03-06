import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const people = [
  { id: 1, name: 'D3' },
  { id: 2, name: 'D6' },
  { id: 3, name: 'D8' },
  { id: 4, name: 'D10' },
  { id: 5, name: 'D12' },
  { id: 6, name: 'D20' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Select() {
  const [selected, setSelected] = useState(people[3]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className="relative w-full mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
            <span className="block truncate text-black">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {people.map((person) => (
                <Listbox.Option
                  key={person.id}
                  className={({ active }) => classNames(
                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                  )}
                  value={person}
                >
                  {({ newSelected, active }: any) => (
                    <>
                      <span className={classNames(newSelected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                        {person.name}
                      </span>

                      {newSelected ? (
                        <span
                          className={classNames(
                            active ? 'text-black' : 'text-indigo-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
