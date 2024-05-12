import { Fragment, useEffect, useState } from "react";
import { addNewQuestion } from "../../API/question";
import { Tab } from "@headlessui/react";
import ExamManage from "./components/examManage";
import { Link } from "react-router-dom";
import ExamAPI from "../../API/ExamAPI";
import {
  ExclamationCircleIcon,
  QueueListIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const Admin = () => {
  const [question, setQuestion] = useState({
    year: "",
    practiceSet: "",
    part: "",
    order: "",
    images: [] as File[],
    topic: "",
    answer_a: "",
    answer_b: "",
    answer_c: "",
    answer_d: "",
    correct_answer: "",
  });

  return (
    <div className="h-screen bg-white">
      <Tab.Group>
        <Tab.List className="fixed top-0 left-0 h-screen px-3 py-4 overflow-y-auto bg-gray-800 space-y-2 font-medium">
          <Tab as="div">
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <QueueListIcon className="w-6 h-6" />
              <span className="flex-1 ms-3 whitespace-nowrap">Bài thi</span>
            </a>
          </Tab>
          <Tab as="div">
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <UserGroupIcon className="w-6 h-6" />
              <span className="flex-1 ms-3 whitespace-nowrap">Người dùng</span>
            </a>
          </Tab>
          <Tab as="div">
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <ExclamationCircleIcon className="w-6 h-6" />
              <span className="flex-1 ms-3 whitespace-nowrap">Xem báo lỗi</span>
            </a>
          </Tab>
          <Tab as="div">
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 16"
              >
                <path
                  stroke="currentColor"
                  stroke-Tabnecap="round"
                  stroke-Tabnejoin="round"
                  stroke-width="2"
                  d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
            </a>
          </Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <ExamManage />
          </Tab.Panel>
          <Tab.Panel></Tab.Panel>
          <Tab.Panel></Tab.Panel>
          <Tab.Panel></Tab.Panel>
          <Tab.Panel></Tab.Panel>
          <Tab.Panel></Tab.Panel>
          <Tab.Panel></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Admin;
