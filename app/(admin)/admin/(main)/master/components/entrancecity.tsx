import React, { useState } from "react";
import {
  MinusCircleIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addCityForEntrance,
  removeCityForEntrance,
} from "@/app/data/admin/examcity";
import { ToastContainer, toast } from "react-toastify";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

interface MutateData {
  cityId: number;
  entranceId: string;
}

const EntranceCity = ({ city, encities, entranceId }) => {
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const { mutate: addMutate, isLoading: mutationLoading } = useMutation({
    mutationFn: (data: MutateData) => addCityForEntrance(data),
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries(["entrancecities", entranceId]);
    },
  });

  const { mutate: removeMutate, isLoading: removeMutationLoading } =
    useMutation({
      mutationFn: (data: MutateData) => removeCityForEntrance(data),
      onSettled: async (data, error, variables, context) => {
        if (data.errors) {
          toast("City cannot be removed. Applications Exists");
        }
        await queryClient.invalidateQueries(["entrancecities", entranceId]);
      },
    });

  const isCityAdded = (city) => {
    return encities.some((encity) => encity.cityId === city.id);
  };
  return (
    <>
      <tr>
        <td
          className={classNames(
            city.id === 0 ? "" : "border-t border-transparent",
            "relative py-4 pl-4 pr-3 text-sm sm:pl-6"
          )}
        >
          <div className="font-medium text-gray-900">{city.name}</div>
          {city.id !== 0 ? (
            <div className="absolute -top-px left-6 right-0 h-px bg-gray-200" />
          ) : null}
        </td>
        <td
          className={classNames(
            city.id === 0 ? "" : "border-t border-transparent",
            "relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
          )}
        >
          <div className="flex gap-4 justify-end">
            <div className="space-x-3">
              {isCityAdded(city) ? (
                <button
                  type="button"
                  onClick={() => removeMutate({ entranceId, cityId: city.id })}
                  className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                >
                  <span className="text-red-500">Remove</span>
                  <span className="sr-only">, {city.name}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    addMutate({ cityId: city.id, entranceId: entranceId })
                  }
                  className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-pink-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                >
                  <span className="text-green-500">Add</span>
                  <span className="sr-only">, {city.name}</span>
                </button>
              )}
            </div>
          </div>

          {city.id !== 0 ? (
            <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" />
          ) : null}
        </td>
      </tr>
    </>
  );
};

export default EntranceCity;
