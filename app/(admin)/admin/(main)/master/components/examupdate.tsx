import DataLoader from "@/app/components/DataLoader";
import { getExamByEntrance } from "@/app/data/entranceclient";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import v from "voca";
import CreateExam from "./createexam";
import UpdateExam from "./updateexam";
import { ExamStatus } from "@/app/data/admin/examenums";

const ExamUpdate = ({ entrance }) => {
  const [createMode, setcreateMode] = useState(false);
  const [updateExam, setUpdateExam] = useState(null);
  const queryClient = useQueryClient();

  const { data: exam, isLoading: examLoading } = useQuery({
    queryKey: ["entrance", entrance.id, "exam"],
    queryFn: () => getExamByEntrance(entrance.id),
  });

  function handleCreateComplete(data) {
    setcreateMode(false);
    queryClient.invalidateQueries(["exam", entrance.id]);
  }

  function handleUpdateComplete(data) {
    setUpdateExam(null);
    queryClient.invalidateQueries(["exam", entrance.id]);
  }

  console.log("exams", exam);

  return (
    <div>
      <h2 className="block text-sm font-bold leading-6 text-gray-900">
        {entrance.code.toUpperCase()} - {entrance.name}
      </h2>
      {createMode ? (
        <CreateExam entrance={entrance} completeCreate={handleCreateComplete} />
      ) : updateExam ? (
        <UpdateExam exam={updateExam} completeUpdate={handleUpdateComplete} />
      ) : (
        <div>
          {examLoading ? (
            <DataLoader />
          ) : exam ? (
            <div className="bg-white border shadow sm:rounded-lg my-5">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Active Exam
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    <span className="font-semibold">Description:</span>{" "}
                    {exam.description}.
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {ExamStatus[exam.status]}.
                  </p>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => setUpdateExam(exam)}
                    className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                  >
                    Update Exam
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="my-3">
              <button
                type="button"
                onClick={() => setcreateMode(true)}
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Create New Exam
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExamUpdate;
