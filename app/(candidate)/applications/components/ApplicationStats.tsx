import Link from "next/link";
import SlotButton from "../../components/slotbutton";
import StatsBar from "./statsbar";

export default function ApplicationStats({ application }) {
  console.log("application details", application);
  const registration = application.Registration[0];
  console.log("registration", registration);

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <h2 className="sr-only" id="profile-overview-title">
        Entrance Application Overview
      </h2>
      <div className="bg-white p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                {`${application.exam.entrance.code.toUpperCase()} - ${
                  application.exam.entrance.name
                } ${application.exam.description}`}
              </p>
              <p className="text-sm font-medium text-gray-600">
                {registration
                  ? `Registration No: ${registration.registrationNo}`
                  : application.exam.status != "ENDREG"
                  ? "Registration Pending"
                  : null}
              </p>
            </div>
          </div>
          <div className="mt-5 flex justify-center sm:mt-0">
            <Link
              href={`/applications/${application.id}`}
              className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {registration
                ? `Registered`
                : application.exam.status != "ENDREG"
                ? "Registration Pending"
                : "View Application"}
            </Link>
          </div>
        </div>
      </div>
      {(registration || application.exam.status !== "ENDREG") && (
        <StatsBar application={application} />
      )}
    </div>
  );
}
