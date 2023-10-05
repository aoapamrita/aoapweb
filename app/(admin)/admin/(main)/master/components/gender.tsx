"use client";
import DataLoader from "@/app/components/DataLoader";
import { addGender, removeGender } from "@/app/data/admin/gender";
import getGender from "@/app/data/getGender";
import {
  CheckIcon,
  ExclamationCircleIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Confirmation from "../../../components/confirmation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MasterSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(1, "Minimum 8 characters"),
});

export default function Gender() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);
  const [actionQueue, setActionQueue] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: async (data, context, options) => {
      // you can debug your validation schema here
      console.log("formData", data);
      console.log(
        "validation result",
        await yupResolver(MasterSchema)(data, context, options)
      );
      return yupResolver(MasterSchema)(data, context, options);
    },
  });

  const {
    register: editRegister,
    handleSubmit: handleEditSubmit,
    formState: { errors: editErrors },
  } = useForm({
    resolver: async (data, context, options) => {
      // you can debug your validation schema here
      console.log("formData", data);
      console.log(
        "validation result",
        await yupResolver(MasterSchema)(data, context, options)
      );
      return yupResolver(MasterSchema)(data, context, options);
    },
  });
  const { data: items, isLoading: itemsLoading } = useQuery({
    queryKey: ["gender"],
    queryFn: () => getGender(),
  });

  const { mutate: addMutate, isLoading: mutationLoading } = useMutation({
    mutationFn: (data) => addGender(data),
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries(["gender"]);
    },
  });

  const { mutate: removeMutate, isLoading: removeMutationLoading } =
    useMutation({
      mutationFn: (id) => removeGender(id),
      onSettled: async (data, error, variables, context) => {
        await queryClient.invalidateQueries(["gender"]);
        setActionQueue((state) => state.filter((item) => item != data.id));
      },
    });

  async function onSumbit(data) {
    await addMutate(data);
    reset();
  }

  async function onEditSubmit(data) {
    console.log(data);
  }

  function confirmRemove(id) {
    setConfirmationData(id);
    setShowConfirmation(true);
  }

  async function handleAccept(id) {
    addToActionQueue(id);
    setShowConfirmation(false);
    await removeMutate(id);
  }

  function handleEdit(item) {
    setEditItem(item);
  }

  function cancelEdit() {
    setEditItem(null);
  }

  function saveEdit() {}

  function addToActionQueue(id) {
    setActionQueue((state) => [...state, id]);
  }

  console.log(editItem);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="space-y-5">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Gender {removeMutationLoading ? <DataLoader size="xs" /> : null}
          </h2>
          <form
            action=""
            className="flex gap-4"
            onSubmit={handleSubmit(onSumbit)}
          >
            <div className="relative flex-1">
              <input
                type="text"
                {...register("name")}
                placeholder="Enter Name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
              {errors["name"] && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ExclamationCircleIcon
                    className="h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
            <div>
              <button
                type="submit"
                disabled={mutationLoading}
                className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
              >
                {mutationLoading ? <DataLoader size="sm" /> : "Add"}
              </button>
            </div>
          </form>
        </div>
        <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg max-w-2xl">
          {itemsLoading ? (
            <div>
              <div className="py-6 flex justify-center">
                <DataLoader />
              </div>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>

                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td
                      className={classNames(
                        item.id === 0 ? "" : "border-t border-transparent",
                        "relative py-4 pl-4 pr-3 text-sm sm:pl-6"
                      )}
                    >
                      <div className="font-medium text-gray-900">
                        {editItem && editItem.id === item.id ? (
                          <form
                            className="flex gap-4"
                            onSubmit={handleEditSubmit(onEditSubmit)}
                          >
                            <div className="flex-1">
                              <div className="relative flex-1">
                                <input
                                  type="text"
                                  key={item.id}
                                  value={item.name}
                                  {...editRegister("name")}
                                  placeholder="Enter Name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                                />
                                {editErrors["name"] && (
                                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <ExclamationCircleIcon
                                      className="h-5 w-5 text-red-500"
                                      aria-hidden="true"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="space-x-3">
                              <button
                                type="submit"
                                className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-pink-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                              >
                                <CheckIcon
                                  className="h-5 w-5 text-green-500"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">, {item.name}</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => cancelEdit()}
                                className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-pink-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                              >
                                <XCircleIcon
                                  className="h-5 w-5 text-pink-500"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">, {item.name}</span>
                              </button>
                            </div>
                          </form>
                        ) : (
                          item.name
                        )}
                      </div>
                      {item.id !== 0 ? (
                        <div className="absolute -top-px left-6 right-0 h-px bg-gray-200" />
                      ) : null}
                    </td>
                    <td
                      className={classNames(
                        item.id === 0 ? "" : "border-t border-transparent",
                        "relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                      )}
                    >
                      <div className="flex gap-4 justify-end">
                        {actionQueue.includes(item.id) ? (
                          <DataLoader />
                        ) : (
                          <div className="space-x-3">
                            {editItem && editItem.id === item.id ? null : (
                              <button
                                type="button"
                                onClick={() => handleEdit(item)}
                                className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-pink-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                              >
                                <PencilSquareIcon
                                  className="h-5 w-5 text-pink-500"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">, {item.name}</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => confirmRemove(item.id)}
                              className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-red-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                            >
                              <TrashIcon
                                className="h-5 w-5 text-red-500"
                                aria-hidden="true"
                              />
                              <span className="sr-only">, {item.name}</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {item.id !== 0 ? (
                        <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" />
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Confirmation
        open={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
        }}
        onCancel={() => {
          setShowConfirmation(false);
        }}
        onAccept={handleAccept}
        data={confirmationData}
      />
    </>
  );
}
