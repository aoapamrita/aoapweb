"use client";
import DataLoader from "@/app/components/DataLoader";
import {
  CheckIcon,
  ExclamationCircleIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Confirmation from "../../../components/confirmation";
import { addEntrance, removeEntrance } from "@/app/data/entranceclient";
import { toast } from "react-toastify";
import toaststrings from "@/app/utilities/toaststrings";
import AgentEdit from "./agentedit";
import { addAgent, getAgents, removeAgent } from "@/app/data/agent/agent";
import Link from "next/link";
import { generatePass } from "@/app/utilities/generatePass";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AgentSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(1, "Minimum 8 characters"),
  email: yup.string().required("Email is required").email("Not a valid email"),
  username: yup.string().required("Username is required"),
  phone: yup.string().required("Phone is required"),
  amount: yup
    .string()
    .required("Amount is required")
    .test(
      "is-positive",
      "Enter Valid Amount",
      (value) => parseFloat(value) >= 0
    ),
  password: yup
    .string()
    .required("Password is required")
    .matches(/^\S*$/, "Password cannot contain spaces")
    .min(8, "Minimum 8 Characters"),
});

export default function AgentsList() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);
  const [actionQueue, setActionQueue] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: async (data, context, options) => {
      console.log("formData", data);
      const fulldata = { ...data, password };
      console.log(
        "validation result",
        await yupResolver(AgentSchema)(fulldata, context, options)
      );
      return yupResolver(AgentSchema)(fulldata, context, options);
    },
  });

  const { data: items, isLoading: itemsLoading } = useQuery({
    queryKey: ["agents"],
    queryFn: () => getAgents(),
  });

  function generatePassword() {
    const pass = generatePass();
    setPassword(pass);
  }

  const { mutate: addMutate, isLoading: mutationLoading } = useMutation({
    mutationFn: (data) => addAgent(data),
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries(["agents"]);
    },
  });

  const { mutate: removeMutate, isLoading: removeMutationLoading } =
    useMutation({
      mutationFn: (id) => removeAgent(id),
      onMutate: (variables) => {
        return variables;
      },
      onSettled: async (data, error, variables, context) => {
        if (data.errors) {
          setActionQueue((state) => state.filter((item) => item != variables));
          toast(toaststrings["uniquedelete"]);
        } else {
          await queryClient.invalidateQueries(["agents"]);
          setActionQueue((state) => state.filter((item) => item != data.id));
        }
      },
    });

  async function onSumbit(data) {
    console.log("data to save", data);

    await addMutate(data);
    setPassword("");
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

  function handleEdit(item) {
    setEditItem(item);
  }

  function editComplete() {
    setEditItem(null);
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl">
        {editItem ? (
          <AgentEdit item={editItem} editCompleted={editComplete} />
        ) : (
          <>
            <div className="space-y-5 max-w-7xl">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Agents
              </h2>
              <form
                action=""
                className="flex gap-4 flex-col"
                onSubmit={handleSubmit(onSumbit)}
              >
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="fullname"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Name
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="text"
                        {...register("name")}
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
                    {errors["name"] && (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {errors["name"].message}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="email"
                        {...register("email")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                      />
                      {errors["email"] && (
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>
                    {errors["email"] && (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {errors["email"].message}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Mobile no.
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="text"
                        {...register("phone")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                      />
                      {errors["phone"] && (
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>
                    {errors["phone"] && (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {errors["phone"].message}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="fullname"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username (UTM Source)
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="text"
                        {...register("username")}
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
                    {errors["username"] && (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {errors["username"].message}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="flex gap-2">
                      <div className="relative mt-2 flex-1">
                        <Controller
                          control={control}
                          name="password"
                          render={({ field }) => (
                            <input
                              type="text"
                              {...field}
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                                console.log("chean", password);
                                field.onChange(e);
                              }}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                            />
                          )}
                        />
                        {errors["password"] && (
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ExclamationCircleIcon
                              className="h-5 w-5 text-red-500"
                              aria-hidden="true"
                            />
                          </div>
                        )}
                      </div>
                      <div className="self-center mt-2">
                        <Link
                          href="#"
                          onClick={generatePassword}
                          className="text-sm font-semibold text-pink-600 hover:text-pink-500"
                        >
                          Generate
                        </Link>
                      </div>
                    </div>

                    {errors["password"] && (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {errors["password"].message}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="amount"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Commission (in Rs).
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="text"
                        {...register("amount")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                      />
                      {errors["amount"] && (
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>
                    {errors["amount"] && (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {errors["amount"].message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-end">
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
            <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
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
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                      >
                        Username
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                      >
                        Mobile no.
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                      >
                        Commission (in Rs)
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                      >
                        Active
                      </th>

                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Select</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, itemIdx) => (
                      <tr key={item.id}>
                        <td
                          className={classNames(
                            itemIdx === 0 ? "" : "border-t border-gray-200",
                            "px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
                          )}
                        >
                          {item.name}
                        </td>
                        <td
                          className={classNames(
                            itemIdx === 0 ? "" : "border-t border-gray-200",
                            "px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
                          )}
                        >
                          {item.username}
                        </td>
                        <td
                          className={classNames(
                            itemIdx === 0 ? "" : "border-t border-gray-200",
                            "px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
                          )}
                        >
                          {item.email}
                        </td>
                        <td
                          className={classNames(
                            itemIdx === 0 ? "" : "border-t border-gray-200",
                            "px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
                          )}
                        >
                          {item.phone}
                        </td>
                        <td
                          className={classNames(
                            itemIdx === 0 ? "" : "border-t border-gray-200",
                            "px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
                          )}
                        >
                          {item.amount}
                        </td>
                        <td
                          className={classNames(
                            itemIdx === 0 ? "" : "border-t border-gray-200",
                            "px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
                          )}
                        >
                          {item.active ? "Yes" : "No"}
                        </td>
                        <td
                          className={classNames(
                            itemIdx === 0 ? "" : "border-t border-transparent",
                            "relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 min-w-[140px]"
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
    </>
  );
}
