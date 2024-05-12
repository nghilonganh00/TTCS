import { SetStateAction } from "react";

interface PartTabsProps {
  selectedTab: any;
  setSelectedTab: React.Dispatch<React.SetStateAction<any>>;
  className?: string;
}

interface PartTabProps {
  part: any;
  selectedTab: any;
  setSelectedTab: React.Dispatch<SetStateAction<any>>;
}

const PART_TABS = [
  { name: "Part 1", value: "part1" },
  { name: "Part 2", value: "part2" },
  { name: "Part 3", value: "part3" },
  { name: "Part 4", value: "part4" },
  { name: "Part 5", value: "part5" },
  { name: "Part 6", value: "part6" },
  { name: "Part 7", value: "part7" },
];

const PartTab: React.FC<PartTabProps> = (props) => {
  const { part, selectedTab, setSelectedTab } = props;

  const tabStyle = "hover:bg-blue-50";
  const selectedTabStyle = " font-semibold text-blue-800 bg-blue-200 ";

  const handleChangePartTab = (part: string) => {
    setSelectedTab(part);
  };

  return (
    <li
      className={`w-16 h-8 rounded-xl flex items-center justify-center cursor-pointer ${
        selectedTab === part.value ? selectedTabStyle : tabStyle
      }`}
      onClick={() => handleChangePartTab(part.value)}
    >
      <p>{part.name}</p>
    </li>
  );
};

const PartTabs: React.FC<PartTabsProps> = (props) => {
  const { selectedTab, setSelectedTab, className } = props;

  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {PART_TABS.map((part) => (
        <PartTab
          part={part}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      ))}
    </ul>
  );
};

export default PartTabs;
