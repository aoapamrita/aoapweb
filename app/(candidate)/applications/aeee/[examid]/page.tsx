import { checkExamValid } from "@/app/data/entrance";
import Link from "next/link";

import ShowApplication from "../../components/ShowApplication";

const Page = async ({ params }) => {
  console.log(params);

  const { valid } = await checkExamValid({
    examid: params.examid,
    code: "AEEE",
  });

  return (
    <div>
      <div className="h-6"></div>
      {!valid ? (
        <p>
          This is not a valid exam.{" "}
          <Link href="/dashboard">Go To Dashboard</Link>
        </p>
      ) : (
        <ShowApplication examid={params.examid} />
      )}
    </div>
  );
};

export default Page;
