import React from "react";
import { PartKey } from "../../../global/interfaces/interfaces";
import { PART_TABS } from "../utils/config";

interface PracticePartTabProps {
  partTab: PartKey;
  selectedTab: PartKey;
  setSelectedTab: React.Dispatch<React.SetStateAction<PartKey>>;
}

interface PracticePartTabsProps {
  listPartTabs: PartKey[];
  selectedTab: PartKey;
  setSelectedTab: React.Dispatch<React.SetStateAction<PartKey>>;
}

const PracticePartTab: React.FC<PracticePartTabProps> = (props) => {
  const { partTab, selectedTab, setSelectedTab } = props;

  const tabStyle = "hover:bg-blue-50";
  const selectedTabStyle = " font-semibold text-blue-800 bg-blue-200 ";

  const handleChangePartTab = () => {
    setSelectedTab(partTab);
  };
  return (
    <li
      className={`w-16 h-8 rounded-xl flex items-center justify-center cursor-pointer ${
        selectedTab === partTab ? selectedTabStyle : tabStyle
      }`}
      onClick={handleChangePartTab}
    >
      <p>{PART_TABS[partTab]}</p>
    </li>
  );
};

const PracticePartTabs: React.FC<PracticePartTabsProps> = (props) => {
  const { listPartTabs, selectedTab, setSelectedTab } = props;

 

  return (
    <ul className="flex gap-2 flex-wrap">
      {listPartTabs.map((partTab, index) => (
        <PracticePartTab
          partTab={partTab}
          key={index}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      ))}
    </ul>
  );
};

export default PracticePartTabs;
