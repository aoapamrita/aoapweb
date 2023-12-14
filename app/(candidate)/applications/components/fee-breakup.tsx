const people = [
  {
    name: "AEEE (Phy, Chem, Maths)",
    cost: "500",
  },
];

export default function FeeBreak() {
  return (
    <div>
      <div className="flow-root max-w-2xl mx-auto">
        <div className="-mx-4 -my-2 overflow-x-visible sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Entrance Exam
                    </th>

                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      Cost (₹)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {people.map((person) => (
                    <tr key={person.name}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {person.name}
                      </td>

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                        {person.cost}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-bold bg-gray-100 text-gray-900 sm:pl-6">
                      Amount to pay
                    </td>

                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 bg-gray-100 text-left text-sm font-bold sm:pr-6">
                      500
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
