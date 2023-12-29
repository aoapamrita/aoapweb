import PhaseDateEdit from "./phasedateedit";
import PhaseNoEdit from "./phasenoedit";
import PhaseSlotEdit from "./phaseslotedit";

export const PhaseDetails = ({ exam, refetchData }) => {
  // show default details
  // update details
  return (
    <>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Phase Details
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Phase details . Leave or clear Registration End Date, if not decided.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Phase No.
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <PhaseNoEdit exam={exam} refetchData={refetchData} />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm flex items-center font-medium leading-6 text-gray-900">
              Slot Registration Closes
            </dt>
            <dd className="mt-1 flex items-baseline text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <PhaseDateEdit exam={exam} refetchData={refetchData} />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Slot Booking
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <PhaseSlotEdit exam={exam} refetchData={refetchData} />
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
};
