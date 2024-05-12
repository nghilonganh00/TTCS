import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import CommentActivity from "./commentActivity";
import PracticeActivity from "./practiceActivity";

const UserActivity = () => {
  return (
    <Tab.Group>
      <Tab.List>
        <Tab as={Fragment}>
          {({ selected }) => (
            <span
              className={
                "text-lg font-semibold px-3 pb-2 border-b-2 border-solid focus:outline-none hover:cursor-pointer " +
                (selected ? "text-blue-600 border-blue-800" : "text-gray-500")
              }
            >
              Kết quả luyện thi
            </span>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <span
              className={
                "text-lg font-semibold  px-3 pb-2 border-b-2 border-solid focus-visible:outline-none hover:cursor-pointer " +
                (selected ? "text-blue-600 border-blue-800" : "text-gray-500")
              }
            >
              Bình luận
            </span>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <PracticeActivity />
        </Tab.Panel>
        <Tab.Panel>
          <CommentActivity />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default UserActivity;
