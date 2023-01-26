'use client';
// import {
//   portfolioCreatePage0,
//   petCreatePage0gq,
// } from '@/lib/site/site0/createPage0';
import { useUI } from '@/providers/UIContext';
import {
  Site,
} from '@/interfaces/site';

import {
  usePath,
  SwalMessage,
  SwalMessageSiteCreateError,
  typeCategoryPet,
  typeCategoryPortfolio,
  typePagePet,
  typePagePortfolio,
} from '@/utils';
import { Dialog } from '@headlessui/react';
import { MinusCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React, { ChangeEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import Swal from 'sweetalert2';
import { petCreateSite } from '@/lib/sites/createSite';
import { CreateSite, UpdateSite } from '@/interfaces/site';
import { petUpdateSite } from '@/lib/sites/updateSite';
import { Error } from '@/interfaces/error';

// interface Error {
//   response: { errors: [{ message: string }] };
// }

interface Props {
  site?: Site;
}

interface FormValues {
  name: string;
  description: string;
  type: string;
}

export function FormSite(props: Props) {
  const { site } = props;
  const { data: session } = useSession();
  console.log('session', session)
  const searchParams = useSearchParams();
  const query = usePath();
  const {
    toggleSlideOversForm: {
      value,
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();
  const createPetSite = useMutation({
    mutationFn: async (input: CreateSite) =>
      await petCreateSite(input),

    onSuccess: async (data) => {
      queryClient.invalidateQueries(['pet-get-sites-with-cursor', {first: 256}])
      
      await SwalMessage('Site Created');
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageSiteCreateError(err.response.data.errors[0].message);
    },
  });
  const updatePetSite = useMutation({
    mutationFn: async (input: UpdateSite) => await petUpdateSite(input),

    onSuccess: async (data) => {
      queryClient.setQueryData<Site>(['pet-get-site', data._id], data);
      // queryClient.setQueryData<Page[]>(['portfolio-get-sites0', data.parentId], (old) => [...old as Page[], data])
      await SwalMessage('Site Updated');
      toggle();
    },
    onError: (err: Error) => {
      SwalMessageSiteCreateError(err.response.data.errors[0].message);

    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: site
      ? {
          name: site?.data.name,
          description: site?.data.description,
          type: site?.data.type.slug,
        }
      : { name: '', description: 'site description', type: 'site' },
  });

  setFocus("name", { shouldSelect: false })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const create = {
      name: data.name.trim(),
      type: query[2],
      uid: session?.user.sid as string || '123456789',
    };
    const update = {
      name: data.name.trim(),
      uid: session?.user.sid as string || '123456789',
      id: site?._id as string
    }
    // console.log('form', form)
    {
      if (site) {
        updatePetSite.mutate(update)
      } else {
        createPetSite.mutate(create)
        
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
    >
      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
        <div className="flex items-start justify-between">
          <Dialog.Title className="text-lg font-medium text-gray-900">
            {site ? 'Edit Site' : 'New Site'}
          </Dialog.Title>
          <div className="ml-3 flex h-7 items-center">
            <button
              type="button"
              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
              onClick={setLeft}
            >
              <span className="sr-only">Close panel</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            <div>
              <div className="sm:rounded-md">
                <div className="bg-white">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label className="label-form">Title</label>
                      <input
                        type="text"
                        autoComplete="off"
                        className="input-form"
                        {...register('name', {
                          required: 'Title required!!',
                          minLength: { value: 2, message: 'min 2 characters' },
                        })}
                      />
                      {errors.name && (
                        <p className="text-red-600 text-sm">
                          This is required!!
                        </p>
                      )}
                    </div>

                  {/* </div> */}
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" border-t border-gray-200 p-3 bg-gray-200">
        <div className="group-button-form ">
          <button type="submit" className="btn-primary ">
            {!site && (createPetSite.isLoading ? '...Saving' : 'Save')}
            {site && (updatePetSite.isLoading ? '...Updating' : 'Update')}
          </button>
          <button
            type="button"
            className="btn-default"
            onClick={setLeft}
            // ref={cancelButtonRef}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
