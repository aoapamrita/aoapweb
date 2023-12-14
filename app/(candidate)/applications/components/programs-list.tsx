import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function ProgramsList({
  programmes,
  addProgramme,
  selectedProgrammes,
}) {
  console.log(selectedProgrammes);

  function handleSelect(programme) {
    addProgramme(programme);
  }

  const isItemApplied = (item) => {
    return selectedProgrammes.some(
      (selProgramme) => selProgramme.programmeId === item.id
    );
  };

  return (
    <div>
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-visible sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>

                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {programmes.length > 0 ? (
                    programmes.map((programme) => (
                      <tr key={programme.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {`${programme.course.name} - ${programme.campus.name}`}
                        </td>

                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          {isItemApplied(programme) ? (
                            <p>
                              <CheckCircleIcon
                                className="h-5 w-5 text-green-600 ml-auto"
                                aria-hidden="true"
                              />
                            </p>
                          ) : (
                            <button
                              onClick={() => handleSelect(programme)}
                              className="text-pink-600 hover:text-pink-900"
                            >
                              Select
                              <span className="sr-only">
                                {`${programme.course.name} - ${programme.campus.name}`}
                              </span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="text-sm py-10 px-4 text-center">
                        No Programmes to list
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
