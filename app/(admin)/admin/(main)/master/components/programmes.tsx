"use client";
import DataLoader from "@/app/components/DataLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CheckIcon,
  ExclamationCircleIcon,
  PlusSmallIcon,
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

import { Spinner } from "flowbite-react";

import { getCourses } from "@/app/data/admin/courses";
import { getCampus } from "@/app/data/admin/campus";
import {
  createProgramme,
  getProgrammes,
  removeProgramme,
} from "@/app/data/admin/programmes";
import Link from "next/link";
import AddEntranceProgramme from "./addentranceprogramme";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProgrammeSchema = yup.object().shape({
  code: yup
    .string()
    .uppercase()
    .required("Code is required")
    .min(1, "Minimum 4 characters"),
  courseId: yup.number().positive("Course is required"),
  campusId: yup.number().positive("Campus is required"),
});

export default function Programmes() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);
  const [actionQueue, setActionQueue] = useState([]);
  const [addEntrance, setAddEntrance] = useState(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({
    resolver: async (data, context, options) => {
      // you can debug your validation schema here
      console.log("formData", data);
      console.log(
        "validation result",
        await yupResolver(ProgrammeSchema)(data, context, options)
      );
      return yupResolver(ProgrammeSchema)(data, context, options);
    },
  });

  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getCourses(),
  });

  const { data: campus, isLoading: campusLoading } = useQuery({
    queryKey: ["campus"],
    queryFn: () => getCampus(),
  });

  const { data: programmes, isLoading: programmesLoading } = useQuery({
    queryKey: ["programmes"],
    queryFn: () => getProgrammes(),
  });

  const { mutate: addMutate, isLoading: mutationLoading } = useMutation({
    mutationFn: (data) => createProgramme(data),
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries(["programmes"]);
    },
  });

  const { mutate: removeMutate, isLoading: removeMutationLoading } =
    useMutation({
      mutationFn: (id) => removeProgramme(id),
      onMutate: (variables) => {
        return variables;
      },
      onSettled: async (data, error, variables, context) => {
        if (data.errors) {
          setActionQueue((state) => state.filter((item) => item != variables));
          showToast("Programme cannot be deleted. Delete Entrances");
        } else {
          await queryClient.invalidateQueries(["programmes"]);
          setActionQueue((state) => state.filter((item) => item != data.id));
        }

        //
      },
    });

  function showToast(text) {
    setTimeout(() => {
      toast(text);
    }, 1);
  }

  async function onSumbit(data) {
    console.log(data);
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

  function addToActionQueue(id) {
    setActionQueue((state) => [...state, id]);
  }

  function handleAddEntrance(item) {
    setAddEntrance(item);
  }

  function cancelAdd() {
    setAddEntrance(null);
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 max-w-2xl">
        {addEntrance ? (
          <AddEntranceProgramme item={addEntrance} cancelAdd={cancelAdd} />
        ) : (
          <>
            <div className="space-y-5">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Programmes{" "}
              </h2>

              <div className="space-y-5">
                <form
                  action=""
                  className="grid grid-cols-1 sm:grid-cols-6 gap-4"
                  onSubmit={handleSubmit(onSumbit)}
                >
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Select Course{" "}
                      {coursesLoading ? (
                        <Spinner
                          aria-label="Pink spinner example"
                          color="pink"
                          size="sm"
                        />
                      ) : null}
                    </label>
                    <div className="relative mt-2">
                      <select
                        {...register("courseId")}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
                      >
                        <option value="0">--Select--</option>
                        {courses &&
                          courses.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Select Campus{" "}
                      {campusLoading ? (
                        <Spinner
                          aria-label="Pink spinner example"
                          color="pink"
                          size="sm"
                        />
                      ) : null}
                    </label>
                    <div className="relative mt-2">
                      <select
                        {...register("campusId")}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
                      >
                        <option value="0">--Select--</option>
                        {campus &&
                          campus.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Code
                    </label>
                    <div className="relative mt-2 flex gap-3">
                      <input
                        type="text"
                        placeholder="code"
                        {...register("code")}
                        className="block uppercase w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                      />
                      {errors["code"] && (
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                      <button
                        type="submit"
                        disabled={mutationLoading}
                        className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                      >
                        {mutationLoading ? <DataLoader size="sm" /> : "Add"}
                      </button>
                    </div>
                  </div>
                </form>
                <ul className="gap-6 list-disc">
                  {errors["code"] && (
                    <li className="mt-2 text-sm text-red-600" id="email-error">
                      {errors["code"].message}
                    </li>
                  )}
                  {errors["campusId"] && (
                    <li className="mt-2 text-sm text-red-600" id="email-error">
                      {errors["campusId"].message}
                    </li>
                  )}
                  {errors["courseId"] && (
                    <li className="mt-2 text-sm text-red-600" id="email-error">
                      {errors["courseId"].message}
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg max-w-2xl">
              {programmesLoading ? (
                <div>
                  <div className="py-6 flex justify-center">
                    <DataLoader />
                  </div>
                </div>
              ) : programmes.length < 1 ? (
                <p className="py-10 px-4 text-center">Add Programmes</p>
              ) : (
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Code
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Programme
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Entrances
                      </th>

                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {programmes.map((item, itemIdx) => (
                      <tr key={item.id}>
                        <td
                          className={classNames(
                            itemIdx === 0 ? "" : "border-t border-transparent",
                            "relative py-4 pl-4 pr-3 text-sm sm:pl-6"
                          )}
                        >
                          {item.code}
                          {itemIdx !== 0 ? (
                            <div className="absolute -top-px left-6 right-0 h-px bg-gray-200" />
                          ) : null}
                        </td>
                        <td
                          className={classNames(
                            itemIdx === 0 ? "" : "border-t border-gray-200",
                            "px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
                          )}
                        >
                          {`${item.course.name} - ${item.campus.name}`}
                        </td>
                        <td
                          className={classNames(
                            itemIdx === 0 ? "" : "border-t border-gray-200",
                            "px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
                          )}
                        >
                          <div className="space-y-1">
                            {item.EntranceProgrammes.map((ent) => (
                              <p key={ent.id} className="font-semibold">
                                {ent.entrance.code.toUpperCase()}
                              </p>
                            ))}
                            <Link
                              href="#"
                              onClick={() => handleAddEntrance(item)}
                              className="text-pink-600 hover:text-pink-900"
                            >
                              Add
                            </Link>
                          </div>
                        </td>
                        <td
                          className={classNames(
                            itemIdx === 0 ? "" : "border-t border-transparent",
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
                                  onClick={() => confirmRemove(item.id)}
                                  className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-red-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                                >
                                  <TrashIcon
                                    className="h-5 w-5 text-red-500"
                                    aria-hidden="true"
                                  />
                                  <span className="sr-only">, {item.code}</span>
                                </button>
                              </div>
                            )}
                          </div>

                          {itemIdx !== 0 ? (
                            <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" />
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
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
      <ToastContainer autoClose={7000} />
    </>
  );
}
