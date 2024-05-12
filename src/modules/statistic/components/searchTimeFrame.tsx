import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Fragment, SetStateAction } from "react";

const timeFrames = [
  { name: "Tất cả", value: 36500 },
  { name: "3 ngày gần nhất", value: 3 },
  { name: "7 ngày gần nhất", value: 7 },
  { name: "30 ngày", value: 30 },
  { name: "60 ngày", value: 60 },
  { name: "90 ngày", value: 90 },
  { name: "6 tháng", value: 180 },
  { name: "1 năm", value: 365 },
];

interface SearchTimeFrameProps {
  timeFrame: any;
  setTimeFrame: React.Dispatch<SetStateAction<any>>;
  className: string;
  fetchStatistic: (timeFrame: number) => void;
}

const SearchTimeFrame: React.FC<SearchTimeFrameProps> = (props) => {
  const { timeFrame, setTimeFrame, className, fetchStatistic } = props;

  const handleSearch = () => {
    fetchStatistic(timeFrame.value);
  }

  return (
    <div className={`${className}`}>
      <h3>Lọc kết quả theo ngày (tính từ bài thi cuối):</h3>
      <div className="flex gap-2 items-center">
        <Listbox value={timeFrame} onChange={setTimeFrame}>
          <div className="relative w-60">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{timeFrame.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {timeFrames.map((timeFrame, key) => (
                  <Listbox.Option
                    key={key}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={timeFrame}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {timeFrame.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        <button
          type="button"
          onClick={handleSearch}
          className="text-white font-semibold text-base bg-blue-800 border-2 border-gray-300 focus:outline-none 
                        rounded-lg px-4 py-1.5 me-2 hover:text-white hover:bg-blue-900"
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default SearchTimeFrame;
