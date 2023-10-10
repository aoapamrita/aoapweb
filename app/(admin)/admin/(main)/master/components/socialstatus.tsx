"use client";
import DataLoader from "@/app/components/DataLoader";
import {
  addSocialStatus,
  removeSocialStatus,
  updateSocialStatus,
} from "@/app/data/admin/socialstatus";
import getSocialStatus from "@/app/data/getSocialStatus";
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

export default function SocialStatus() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);
  const [actionQueue, setActionQueue] = useState([]);
  const [editId, setEditId] = useState(0);
  const [editName, setEditName] = useState("");
  const [editError, setEditError] = useState(null);
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

  const { data: items, isLoading: itemsLoading } = useQuery({
    queryKey: ["socialstatus"],
    queryFn: () => getSocialStatus(),
  });

  const { mutate: addMutate, isLoading: mutationLoading } = useMutation({
    mutationFn: (data) => addSocialStatus(data),
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries(["socialstatus"]);
    },
  });

  const { mutate: editMutate, isLoading: editMutationLoading } = useMutation({
    mutationFn: (data) => updateSocialStatus(data),
    onSettled: async (data, error, variables, context) => {
      cancelEdit();
      await queryClient.invalidateQueries(["socialstatus"]);
    },
  });

  const { mutate: removeMutate, isLoading: removeMutationLoading } =
    useMutation({
      mutationFn: (id) => removeSocialStatus(id),
      onSettled: async (data, error, variables, context) => {
        await queryClient.invalidateQueries(["socialstatus"]);
        setActionQueue((state) => state.filter((item) => item != data.id));
      },
    });

  async function onSumbit(data) {
    await addMutate(data);
    reset();
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
    setEditError(null);
    setEditId(item.id);
    setEditName(item.name);
  }

  function cancelEdit() {
    setEditId(0);
    setEditError(null);
    setEditName("");
  }

  function saveEdit() {
    if (editName != "") {
      editMutate({ id: editId, input: { name: editName } });
    } else {
      setEditError({ name: { message: "Name is required" } });
    }
  }

  function addToActionQueue(id) {
    setActionQueue((state) => [...state, id]);
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="space-y-5">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Social Status{" "}
            {removeMutationLoading ? <DataLoader size="xs" /> : null}
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
          ) : items.length < 1 ? (
            <p className="py-10 px-4 text-center">Add Items</p>
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
                {items.map((item) => {
                  if (editId === item.id) {
                    return (
                      <tr key={item.id}>
                        <td
                          className={classNames(
                            item.id === 0 ? "" : "border-t border-transparent",
                            "relative py-4 pl-4 pr-3 text-sm sm:pl-6"
                          )}
                        >
                          <div className="relative flex-1">
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              placeholder="Enter Name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                            />
                            {editError && editError["name"] && (
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <ExclamationCircleIcon
                                  className="h-5 w-5 text-red-500"
                                  aria-hidden="true"
                                />
                              </div>
                            )}
                          </div>
                          {editError && editError["name"] && (
                            <p
                              className="mt-2 text-sm text-red-600"
                              id="email-error"
                            >
                              {editError["name"].message}
                            </p>
                          )}
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
                          <div className="space-x-3">
                            {editMutationLoading ? (
                              <div className="flex justify-center">
                                <DataLoader size="md" />
                              </div>
                            ) : (
                              <>
                                <button
                                  onClick={() => saveEdit()}
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
                              </>
                            )}
                          </div>
                          {item.id !== 0 ? (
                            <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" />
                          ) : null}
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={item.id}>
                        <td
                          className={classNames(
                            item.id === 0 ? "" : "border-t border-transparent",
                            "relative py-4 pl-4 pr-3 text-sm sm:pl-6"
                          )}
                        >
                          <div className="font-medium text-gray-900">
                            {item.name}
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
                    );
                  }
                })}
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
