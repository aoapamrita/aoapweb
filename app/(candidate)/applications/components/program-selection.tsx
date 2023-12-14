import { useEffect, useState } from "react";
import ProgramsList from "./programs-list";
import ProgramsSelected from "./programs-selected";
import { ArrowSmallRightIcon } from "@heroicons/react/20/solid";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getCampus } from "@/app/data/admin/campus";
import { getProgrammesByEntrance } from "@/app/data/admin/programmes";
import {
  addProgrammeToApplication,
  getProgrammesByApplication,
  removeProgrammeFromApplication,
} from "@/app/data/applicationclient";
import DataLoader from "@/app/components/DataLoader";

export default function ProgramSelection({ nextStep, step, application }) {
  const [dataModified, setDataModified] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [locationFilter, setLocationFilter] = useState(0);

  const queryClient = useQueryClient();
  const { data: campuses } = useQuery({
    queryKey: ["campuses"],
    queryFn: () => getCampus(),
  });

  const { data: programmes, isLoading: programmesLoading } = useQuery({
    queryKey: [
      "entrance",
      application.exam.entrance.id,
      "programme",
      { q: searchKey, campusid: locationFilter },
    ],
    queryFn: () =>
      getProgrammesByEntrance(
        application.exam.entrance.id,
        searchKey,
        locationFilter
      ),
  });

  const { data: selectedProgrammes, isLoading: selProgrammesLoading } =
    useQuery({
      queryKey: ["application", application.id, "programme"],
      queryFn: () => getProgrammesByApplication(application.id),
    });

  const programmeAddMutation = useMutation({
    mutationFn: ({ applicationId, programme }) => {
      return addProgrammeToApplication(applicationId, programme.id);
    },
    onMutate: (variables) => {
      const queryKey = ["application", application.id, "programme"];
      const oldData = queryClient.getQueryData(queryKey);
      const updateData = [
        ...oldData,
        {
          id: variables.programme.id,
          programmeId: variables.programme.id,
          programme: variables.programme,
        },
      ];

      queryClient.setQueryData(queryKey, updateData);

      return { queryKey, oldData };
    },
    onError: (error, variables, context) => {
      const { queryKey, oldData } = context;
      queryClient.setQueryData(queryKey, oldData);
    },
    onSuccess: (data, variables, context) => {
      //   const { queryKey, oldData } = context;
      //   queryClient.setQueryData(queryKey, oldData);
      //   const newdata = [...oldData, data];
      //   console.log("newdata");
      //   console.log(newdata);
      //   queryClient.setQueryData(queryKey, newdata);
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["application", application.id, "programme"],
      });
    },
  });

  const programmeRemoveMutation = useMutation({
    mutationFn: ({ applicationId, programmeId }) => {
      return removeProgrammeFromApplication(applicationId, programmeId);
    },
    onMutate: (variables) => {
      const queryKey = ["application", application.id, "programme"];
      const oldData = queryClient.getQueryData(queryKey);
      const updateData = oldData.filter(
        (item) => item.programmeId != variables.programmeId
      );

      queryClient.setQueryData(queryKey, updateData);
      const rollback = () => {
        queryClient.setQueryData(queryKey, oldData);
      };
      return { rollback };
    },
    onError: (error, variables, context) => {
      context.rollback();
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["application", application.id, "programme"],
      });
    },
  });

  function addProgramme(input) {
    console.log(input);

    programmeAddMutation.mutate({
      applicationId: application.id,
      programme: input,
    });
  }

  function removeProgramme(input) {
    console.log(input);

    programmeRemoveMutation.mutate({
      applicationId: application.id,
      programmeId: input,
    });
  }

  useEffect(() => {
    console.log("selection mounted");
    setDataModified(false);

    return () => {
      console.log("selection unmounted");
    };
  }, []);

  async function Next() {
    await saveData();
    nextStep();
  }

  async function saveData() {
    if (dataModified) {
      console.log("selection save data");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("search key", searchKey);
    console.log("location", locationFilter);
  }

  return (
    <div className="mx-auto max-w-md sm:max-w-4xl">
      <div>
        <div className="text-center">
          <h2 className="mt-2 text-base font-semibold leading-6 text-gray-900">
            Select Programs
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Programs can be selected and rearranged based on your preference.
          </p>
        </div>
        <form className="mt-6 sm:flex sm:items-center" onSubmit={handleSubmit}>
          <label htmlFor="emails" className="sr-only">
            Programs
          </label>
          <div className="grid grid-cols-1 sm:flex-auto">
            <input
              type="text"
              name="searchkey"
              id="searchkey"
              className="peer relative col-start-1 row-start-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Select a program"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <div
              className="col-start-1 col-end-3 row-start-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 peer-focus:ring-2 peer-focus:ring-pink-600"
              aria-hidden="true"
            />
            <div className="col-start-2 row-start-1 flex items-center">
              <span
                className="h-4 w-px flex-none bg-gray-200"
                aria-hidden="true"
              />
              <label htmlFor="role" className="sr-only">
                City
              </label>
              <select
                id="city"
                name="city"
                className="rounded-md border-0 bg-transparent py-1.5 pl-4 pr-7 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                onChange={(e) => setLocationFilter(parseInt(e.target.value))}
              >
                <option value="0">--All--</option>
                {campuses && (
                  <>
                    {campuses.map((campus) => (
                      <option key={campus.id} value={campus.id}>
                        {campus.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
          </div>
          <div className="mt-3 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
            <button
              type="submit"
              onClick={() => setDataModified(true)}
              className="block w-full rounded-md bg-pink-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {programmesLoading || selProgrammesLoading ? (
        <div className="py-6 flex justify-center">
          <DataLoader />
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6">
          <div className="md:col-span-4">
            {programmesLoading ? (
              <p>Loading...</p>
            ) : programmes ? (
              <ProgramsList
                programmes={programmes}
                selectedProgrammes={selectedProgrammes}
                addProgramme={addProgramme}
              />
            ) : null}
          </div>
          <div className="md:col-span-2">
            {selProgrammesLoading ? (
              <p>Loading...</p>
            ) : selectedProgrammes ? (
              <ProgramsSelected
                programmes={selectedProgrammes}
                removeProgramme={removeProgramme}
              />
            ) : null}
          </div>
        </div>
      )}
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <button
          type="button"
          onClick={Next}
          className="inline-flex items-center gap-x-2 rounded-md bg-pink-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
        >
          Next
          <ArrowSmallRightIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
