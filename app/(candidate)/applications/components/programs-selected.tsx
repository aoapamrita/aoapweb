import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { MinusCircleIcon } from "@heroicons/react/24/outline";

export default function ProgramsSelected({ programmes, removeProgramme }) {
  function handleRemoveClick(programmeId) {
    removeProgramme(programmeId);
  }

  return (
    <div>
      <h3 className="text-base font-semibold leading-7 text-gray-900">
        Selected Programs
      </h3>
      <ul role="list" className="divide-y divide-gray-200">
        {programmes.map((programme) => (
          <li
            key={programme.id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="flex gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-600">
                  {`${programme.programme.course.name} - ${programme.programme.campus.name}`}
                </p>
              </div>
            </div>
            <button onClick={() => handleRemoveClick(programme.programme.id)}>
              <MinusCircleIcon
                className="h-5 w-5 text-red-600"
                aria-hidden="true"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
