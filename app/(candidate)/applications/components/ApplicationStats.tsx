import Link from "next/link";

const stats = [
  {
    label: "Slot Pending (to start only before 1 week of the examination)",
    value: 12,
  },
  { label: "Admit Card Pending", value: 4 },
  { label: "Rank Not Published", value: 2 },
];

export default function ApplicationStats({ application }) {
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
                {application.Registration.length === 0
                  ? "Registration Pending"
                  : `Registration No: ${application.Registration[0].registrationNo}`}
              </p>
            </div>
          </div>
          <div className="mt-5 flex justify-center sm:mt-0">
            <Link
              href={`/applications/${application.id}`}
              className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {application.Registration.length === 0
                ? "Registration Pending"
                : "Registered"}
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="px-6 py-5 text-center text-sm font-medium"
          >
            <span className="text-gray-600">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
