import React from "react";

const ApplicationCitiesView = ({ applicationCities }) => {
  return (
    <>
      {applicationCities && applicationCities.length > 0 ? (
        <ul
          role="list"
          className="divide-y divide-gray-100 rounded-md border border-gray-200"
        >
          {applicationCities.map((city, idx) => (
            <li
              key={city.id}
              className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
            >
              <div className="flex w-0 flex-1 items-center">
                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                  <span className="truncate font-medium">
                    {idx + 1}. {city.examcity.city.name}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cities to display</p>
      )}
    </>
  );
};

export default ApplicationCitiesView;
