import { Listbox, Tab, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";

interface PracticeConfigProps {
  config: any;
  setConfig: React.Dispatch<React.SetStateAction<any>>;
}

const durations = [
  { name: "5 phút", value: 5 },
  { name: "10 phút", value: 10 },
  { name: "15 phút", value: 15 },
  { name: "20 phút", value: 20 },
  { name: "30 phút", value: 30 },
  { name: "40 phút", value: 40 },
  { name: "50 phút", value: 50 },
  { name: "60 phút", value: 60 },
  { name: "70 phút", value: 70 },
  { name: "80 phút", value: 80 },
  { name: "90 phút", value: 90 },
  { name: "100 phút", value: 100 },
  { name: "110 phút", value: 110 },
  { name: "120 phút", value: 120 },
];

const PracticeConfig: React.FC<PracticeConfigProps> = (props) => {
  const { config, setConfig } = props;
  const [duration, setDuration] = useState(durations[0]);

  const handleResetSelectedPart = () => {
    setConfig((prevConfig: any) => ({
      ...prevConfig,
      parts: [],
    }));
  };

  const handleSelectPart = (part: string) => {
    if (part === "All") {
      handleResetSelectedPart();
      setConfig((prevConfig: any) => ({
        ...prevConfig,
        duration: 120,
      }));
    }
    setConfig((prevConfig: any) => {
      const partsSet = new Set(prevConfig.parts);
      if (partsSet.has(part)) {
        partsSet.delete(part);
      } else {
        partsSet.add(part);
      }
      return {
        ...prevConfig,
        parts: Array.from(partsSet),
      };
    });
  };

  console.log(config);

  useEffect(() => {
    setConfig((prevConfig: any) => ({
      ...prevConfig,
      duration: duration.value,
    }));
  }, [duration]);

  return (
    <div>
      <Tab.Group>
        <Tab.List>
          <Tab as={Fragment}>
            {({ selected }) => (
              <span
                onClick={handleResetSelectedPart}
                className={
                  "text-lg font-semibold text-blue-800 px-3 pb-2 border-b-4 border-solid focus-visible:outline-none" +
                  (selected ? " border-blue-800" : "")
                }
              >
                Luyện tập
              </span>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <span
                onClick={() => handleSelectPart("All")}
                className={
                  "text-lg font-semibold text-blue-800 px-3 pb-2 border-b-4 border-solid focus-visible:outline-none" +
                  (selected ? " border-blue-800" : "")
                }
              >
                Làm full test
              </span>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="mt-8">
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  onChange={() => handleSelectPart("part1")}
                />
                <label className="ms-2 text-sm font-medium text-gray-900">
                  Part 1 (6 câu)
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  onChange={() => handleSelectPart("part2")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label className="ms-2 text-sm font-medium text-gray-900">
                  Part 2
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  onChange={() => handleSelectPart("part3")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label className="ms-2 text-sm font-medium text-gray-900">
                  Part 3
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  onChange={() => handleSelectPart("part4")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label className="ms-2 text-sm font-medium text-gray-900">
                  Part 4
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  onChange={() => handleSelectPart("part5")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label className="ms-2 text-sm font-medium text-gray-900">
                  Part 5
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  onChange={() => handleSelectPart("part6")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label className="ms-2 text-sm font-medium text-gray-900">
                  Part 6
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  onChange={() => handleSelectPart("part7")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label className="ms-2 text-sm font-medium text-gray-900">
                  Part 7
                </label>
              </div>

              <div className="flex items-center gap-4">
                <h3>Chọn thời gian làm bài:</h3>
                <div className="w-72">
                  <Listbox value={duration} onChange={setDuration}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{duration.name}</span>
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
                          {durations.map((duration, key) => (
                            <Listbox.Option
                              key={key}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-amber-100 text-amber-900"
                                    : "text-gray-900"
                                }`
                              }
                              value={duration}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {duration.name}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
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
                </div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="mt-8">
              Bạn sẽ làm full bài thi trong vòng 120 phút
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default PracticeConfig;
