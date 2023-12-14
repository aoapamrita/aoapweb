import DataLoader from "@/app/components/DataLoader";
import {
  addProgrammeToEntrance,
  removeProgrammeFromEntrance,
} from "@/app/data/admin/entranceprogramme";
import { getEntrances } from "@/app/data/entranceclient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

const AddEntranceProgramme = ({ item, cancelAdd }) => {
  const queryClient = useQueryClient();
  const { data: entrances, isLoading: entrancesLoading } = useQuery({
    queryKey: ["entrances"],
    queryFn: () => getEntrances(),
  });

  const isEntranceAdded = (entrance) => {
    const programmes = queryClient.getQueryData(["programmes"]);
    const current = programmes.filter(
      (programme) => programme.id === item.id
    )[0];
    return current.EntranceProgrammes.some(
      (current) => current.entranceId === entrance.id
    );
  };
  const { mutate: addMutate, isLoading: mutationLoading } = useMutation({
    mutationFn: (data) => addProgrammeToEntrance(data),
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries(["programmes"]);
    },
  });

  const { mutate: removeMutate, isLoading: removeMutationLoading } =
    useMutation({
      mutationFn: (data) => removeProgrammeFromEntrance(data),
      onSettled: async (data, error, variables, context) => {
        await queryClient.invalidateQueries(["programmes"]);
      },
    });

  async function addEntrance(entrance) {
    const data = {
      entranceId: entrance.id,
      programmeId: item.id,
    };

    await addMutate(data);
  }

  async function removeEntrance(entrance) {
    const data = {
      entranceId: entrance.id,
      programmeId: item.id,
    };

    await removeMutate(data);
  }
  console.log(entrances);

  return (
    <div>
      <div className="my-5">
        {entrancesLoading ? (
          <DataLoader />
        ) : mutationLoading || removeMutationLoading ? (
          <DataLoader />
        ) : (
          <div className="bg-white border shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Select entrances for the Programme : {item.code}
              </h3>
              {entrances.map((entrance) => {
                return (
                  <div key={entrance.id} className="mt-5">
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p className="font-semibold">
                        {entrance.code} - {entrance.name}
                      </p>
                    </div>
                    <div className="mt-5">
                      {isEntranceAdded(entrance) ? (
                        <button
                          onClick={() => removeEntrance(entrance)}
                          key={entrance.id}
                          className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          onClick={() => addEntrance(entrance)}
                          key={entrance.id}
                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Select
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center gap-3">
        <button
          onClick={cancelAdd}
          className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
        >
          Cancel
        </button>
        <button
          onClick={cancelAdd}
          className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default AddEntranceProgramme;
