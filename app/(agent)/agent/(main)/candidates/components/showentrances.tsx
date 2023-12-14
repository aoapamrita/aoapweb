import Link from "next/link";
import React from "react";

const ShowEntrances = ({ applications }) => {
  return (
    <>
      {applications.length > 0 ? (
        applications.map((application, index) => (
          <div key={`${application.exam.entrance.code}-${application.id}`}>
            {index > 0 ? <span>,</span> : null}
            <Link
              href={`/agent/candidate/${application.exam.entrance.code.toLowerCase()}/${
                application.id
              }`}
              className="font-semibold text-pink-600"
            >
              {application.exam.entrance.code}
            </Link>
          </div>
        ))
      ) : (
        <div>nil</div>
      )}
    </>
  );
};

export default ShowEntrances;
