"use client";

import { useRouter } from "next/navigation";

export default function CandidateEmpty() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push("/agent/dashboard")}
      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <span className="mt-2 block text-sm font-semibold text-gray-900">
        Candidate Not Found.
      </span>
      <span className="mt-2 block text-sm font-semibold text-pink-600">
        Click to go to Dashboard
      </span>
    </button>
  );
}
