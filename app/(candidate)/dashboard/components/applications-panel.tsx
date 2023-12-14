import { getOpenExams } from "@/app/data/entrance";
import Link from "next/link";

export default async function ApplicationsPanel() {
  const entrances = await getOpenExams();
  console.log(entrances);

  return (
    <div className="bg-white shadow rounded-md sm:rounded-lg pt-1">
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <h3 className="text-lg font-semibold leading-6 text-gray-900">
          Sumbit Your Applications
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Admission to various undergraduate and integrated programmes is
          through 4 different entrance examinations conducted by the university.
          Eligible students desirous of joining any UG/Integrated programme,
          after passing their plus two or equivalent examination are required to
          attend the right entrance examination. Following are the entrance
          examinations conducted by Amrita as part of the selection process.
        </p>
      </div>

      <div className="border-b border-gray-100">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-base font-semibold leading-6 text-gray-900">
            {entrances[0].code} - {entrances[0].name}
          </h2>
          <div className="mt-2 sm:flex sm:items-start sm:justify-between">
            <div className="max-w-xl text-sm text-gray-500">
              <p>{entrances[0].description}</p>
            </div>
            <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
              <Link
                href={`/applications/aeee/${entrances[0].Exam[0].id}`}
                className="inline-flex items-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
              >
                Apply
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
