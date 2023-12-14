import { CheckIcon } from "@heroicons/react/24/solid";
import AdmissionIcon from "./Icon";
import {
  BookmarkSquareIcon,
  CalculatorIcon,
  ClipboardDocumentListIcon,
  CurrencyRupeeIcon,
  IdentificationIcon,
  PencilSquareIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const steps = [
  { id: "1", name: "Register", icon: PencilSquareIcon, status: "complete" },
  {
    id: "2",
    name: "Personal Information",
    icon: IdentificationIcon,
    status: "complete",
  },
  {
    id: "3",
    name: "Application",
    icon: ClipboardDocumentListIcon,
    status: "complete",
  },
  { id: "4", name: "Payment", icon: CurrencyRupeeIcon, status: "complete" },
];

export default function AdmissionSteps() {
  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="divide-y divide-gray-300 rounded-md border border-white lg:flex lg:divide-y-0"
      >
        {steps.map((step, stepIdx) => (
          <li key={step.id} className="relative lg:flex lg:flex-1">
            <div className="group flex w-full items-center">
              <span className="flex items-center px-6 py-4 text-sm font-medium">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-pink-600 group-hover:bg-pink-800">
                  <AdmissionIcon Icon={step.icon} />
                </span>
                <span className="ml-4 text-sm font-medium text-white">
                  {step.name}
                </span>
              </span>
            </div>
            {stepIdx !== steps.length - 1 ? (
              <>
                {/* Arrow separator for lg screens and up */}
                <div
                  className="absolute right-0 top-0 hidden h-full w-5 lg:block"
                  aria-hidden="true"
                >
                  <svg
                    className="h-full w-full text-white"
                    viewBox="0 0 22 80"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      vectorEffect="non-scaling-stroke"
                      stroke="currentcolor"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
