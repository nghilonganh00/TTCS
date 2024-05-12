import { Tab } from "@headlessui/react";
import React, { Fragment, SetStateAction } from "react";
import { PARTS } from "../utils/config";

interface PartTabsProps {
  part: any;
  setPart: React.Dispatch<SetStateAction<any>>;
}

const PartTabs: React.FC<PartTabsProps> = (props) => {
  const { part, setPart } = props;
  return (
    <Tab.Group>
      <Tab.List>
        {PARTS.map((part, key) => (
          <Tab as={Fragment} key={key}>
            {({ selected }) => (
              <span
                onClick={() => setPart(part)}
                className={
                  "text-lg font-semibold px-3 pb-2 border-b-2 border-solid focus:outline-none hover:cursor-pointer " +
                  (selected ? "text-blue-600 border-blue-800" : "text-gray-500")
                }
              >
                {part.name}
              </span>
            )}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
};

export default PartTabs;
