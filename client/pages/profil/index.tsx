/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  BanknotesIcon,
  BellIcon,
  CogIcon,
  KeyIcon,
  MagnifyingGlassCircleIcon,
  PhotoIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import Header from '@components/Header';

const subNavigation = [
  {
    name: 'Account',
    description: 'Ullamcorper id at suspendisse nec id volutpat vestibulum enim. Interdum blandit.',
    href: '#',
    icon: CogIcon,
    current: true,
  },
  {
    name: 'Notifications',
    description: 'Enim, nullam mi vel et libero urna lectus enim. Et sed in maecenas tellus.',
    href: '#',
    icon: BellIcon,
    current: false,
  },
  {
    name: 'Security',
    description: 'Semper accumsan massa vel volutpat massa. Non turpis ut nulla aliquet turpis.',
    href: '#',
    icon: KeyIcon,
    current: false,
  },
  {
    name: 'Appearance',
    description: 'Magna nulla id sed ornare ipsum eget. Massa eget porttitor suscipit consequat.',
    href: '#',
    icon: PhotoIcon,
    current: false,
  },
  {
    name: 'Billing',
    description: 'Orci aliquam arcu egestas turpis cursus. Lectus faucibus netus dui auctor mauris.',
    href: '#',
    icon: BanknotesIcon,
    current: false,
  },
  {
    name: 'Integrations',
    description: 'Nisi, elit volutpat odio urna quis arcu faucibus dui. Mauris adipiscing pellentesque.',
    href: '#',
    icon: SquaresPlusIcon,
    current: false,
  },
  {
    name: 'Additional Resources',
    description: 'Quis viverra netus donec ut auctor fringilla facilisis. Nunc sit donec cursus sit quis et.',
    href: '#',
    icon: MagnifyingGlassCircleIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Profile() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
      <Header />
      Comming soon
    </div>
  );
  return (
    <div>
      <Header />
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-blue-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col  focus:outline-none">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-4">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>

                <div className="flex flex-shrink-0 border-t border-blue-gray-200 p-4">
                  <a href="#" className="group block flex-shrink-0">
                    <div className="flex items-center">
                      <div>
                        <img
                          className="inline-block h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-blue-gray-700 group-hover:text-blue-gray-900">
                          Lisa Marie
                        </p>
                        <p className="text-sm font-medium text-blue-gray-500 group-hover:text-blue-gray-700">
                          Account Settings
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        <main className="flex flex-1 overflow-hidden">
          <div className="flex flex-1 flex-col overflow-y-auto xl:overflow-hidden">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="border-b border-blue-gray-200  xl:hidden">
              <div className="mx-auto flex max-w-3xl items-start py-3 px-4 sm:px-6 lg:px-8">
                <a
                  href="#"
                  className="-ml-1 inline-flex items-center space-x-3 text-sm font-medium text-blue-gray-900"
                >
                  <ChevronLeftIcon className="h-5 w-5 text-blue-gray-400" aria-hidden="true" />
                  <span>Settings</span>
                </a>
              </div>
            </nav>

            <div className="flex flex-1 xl:overflow-hidden">
              {/* Secondary sidebar */}
              <nav
                aria-label="Sections"
                className="hidden w-96 flex-shrink-0 border-r border-blue-gray-200  xl:flex xl:flex-col"
              >
                <div className="flex h-16 flex-shrink-0 items-center border-b border-blue-gray-200 px-6">
                  <p className="text-lg font-medium text-blue-gray-900">Settings</p>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto">
                  {subNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-blue-50 bg-opacity-50' : 'hover:bg-blue-50 hover:bg-opacity-50',
                        'flex p-6 border-b border-blue-gray-200',
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <item.icon className="-mt-0.5 h-6 w-6 flex-shrink-0 text-blue-gray-400" aria-hidden="true" />
                      <div className="ml-3 text-sm">
                        <p className="font-medium text-blue-gray-900">{item.name}</p>
                        <p className="mt-1 text-blue-gray-500">{item.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </nav>

              {/* Main content */}
              <div className="flex-1 xl:overflow-y-auto">
                <div className="mx-auto max-w-3xl py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
                  <h1 className="text-3xl font-bold tracking-tight text-blue-gray-900">Account</h1>

                  <form className="divide-y-blue-gray-200 mt-6 space-y-8 divide-y">
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                      <div className="sm:col-span-6">
                        <h2 className="text-xl font-medium text-blue-gray-900">Profile</h2>
                        <p className="mt-1 text-sm text-blue-gray-500">
                          This information will be displayed publicly so be careful what you share.
                        </p>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-blue-gray-900">
                          First name
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium text-blue-gray-900">
                          Last name
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="username" className="block text-sm font-medium text-blue-gray-900">
                          Username
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-blue-gray-300 bg-blue-gray-50 px-3 text-blue-gray-500 sm:text-sm">
                            workcation.com/
                          </span>
                          <input
                            type="text"
                            name="username"
                            id="username"
                            autoComplete="username"
                            defaultValue="lisamarie"
                            className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-blue-gray-300 text-blue-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="photo" className="block text-sm font-medium text-blue-gray-900">
                          Photo
                        </label>
                        <div className="mt-1 flex items-center">
                          <img
                            className="inline-block h-12 w-12 rounded-full"
                            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
                            alt=""
                          />
                          <div className="ml-4 flex">
                            <div className="relative flex cursor-pointer items-center rounded-md border border-blue-gray-300  py-2 px-3 shadow-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-blue-gray-50 hover:bg-blue-gray-50">
                              <label
                                htmlFor="user-photo"
                                className="pointer-events-none relative text-sm font-medium text-blue-gray-900"
                              >
                                <span>Change</span>
                                <span className="sr-only"> user photo</span>
                              </label>
                              <input
                                id="user-photo"
                                name="user-photo"
                                type="file"
                                className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                              />
                            </div>
                            <button
                              type="button"
                              className="ml-3 rounded-md border border-transparent bg-transparent py-2 px-3 text-sm font-medium text-blue-gray-900 hover:text-blue-gray-700 focus:border-blue-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-gray-50"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="description" className="block text-sm font-medium text-blue-gray-900">
                          Description
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="description"
                            name="description"
                            rows={4}
                            className="block w-full rounded-md border-blue-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            defaultValue=""
                          />
                        </div>
                        <p className="mt-3 text-sm text-blue-gray-500">
                          Brief description for your profile. URLs are hyperlinked.
                        </p>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="url" className="block text-sm font-medium text-blue-gray-900">
                          URL
                        </label>
                        <input
                          type="text"
                          name="url"
                          id="url"
                          className="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6">
                      <div className="sm:col-span-6">
                        <h2 className="text-xl font-medium text-blue-gray-900">Personal Information</h2>
                        <p className="mt-1 text-sm text-blue-gray-500">
                          This information will be displayed publicly so be careful what you share.
                        </p>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="email-address" className="block text-sm font-medium text-blue-gray-900">
                          Email address
                        </label>
                        <input
                          type="text"
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          className="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="phone-number" className="block text-sm font-medium text-blue-gray-900">
                          Phone number
                        </label>
                        <input
                          type="text"
                          name="phone-number"
                          id="phone-number"
                          autoComplete="tel"
                          className="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium text-blue-gray-900">
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="language" className="block text-sm font-medium text-blue-gray-900">
                          Language
                        </label>
                        <input
                          type="text"
                          name="language"
                          id="language"
                          className="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>

                      <p className="text-sm text-blue-gray-500 sm:col-span-6">
                        This account was created on
                        {' '}
                        <time dateTime="2017-01-05T20:35:40">January 5, 2017, 8:35:40 PM</time>
                        .
                      </p>
                    </div>

                    <div className="flex justify-end pt-8">
                      <button
                        type="button"
                        className="rounded-md border border-gray-300  py-2 px-4 text-sm font-medium text-blue-gray-900 shadow-sm hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
