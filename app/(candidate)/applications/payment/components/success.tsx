import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import getCandidate from "@/app/data/getCandidate";
import invokeAPI from "@/app/data/updateleadapi";

const Success = () => {
  //     const { data: candidate, isLoading: candidateLoading } = useQuery({
  //         queryKey: ["candidate"],
  //         queryFn: () => getCandidate(),
  //       });
  //   const candid = candidate.id;
  //   const uname = candidate.fullname;
  //   let uphone = candidate.phone;
  //   let email = candidate.email;
  //   const source = candidate.infosource.name;
  //   const section = "App Fee Payment";
  //   const paystatus = "Paid";
  //  invokeAPI({email: email,name: uname, phone: uphone, section: section, paystatus: paystatus,source :source,candid: candid});

  return (
    <div className="bg-white shadow-sm border border-green-300 rounded-lg mt-10 px-5 py-5 max-w-lg mx-auto">
      <p className="text-sm mb-4 flex items-center gap-2">
        <HandThumbUpIcon
          className="h-8 w-8 text-green-500"
          aria-hidden="true"
        />{" "}
        Payment Successful
      </p>
      <p className="text-3xl font-bold mb-2 text-gray-800">
        Thanks for Registering
      </p>
      <p>
        Please{" "}
        <Link href="/applications" className="text-pink-800 cursor-pointer">
          {" "}
          click here{" "}
        </Link>
        to go to applications.
      </p>
    </div>
  );
};

export default Success;
