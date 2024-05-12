import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addNewQuestion } from "../../API/question";
import ExamAPI from "../../API/ExamAPI";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

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

const AddQuestion = () => {
  // const [selectedTab, setSelectedTab] = useState<any>({
  //   name: "Part 2",
  //   value: "part2",
  // });

  const parts = ["part1", "part2", "part3", "part4", "part5", "part6", "part7"];

  const [question, setQuestion] = useState({
    year: "",
    practiceSet: "",
    part: "",
    order: "",
    images: [] as File[],
    audio: [] as File[],
    topic: "",
    answer_a: "",
    answer_b: "",
    answer_c: "",
    answer_d: "",
    correct_answer: "",
  });

  const onChangeValue = (name: string, newValue: string) => {
    setQuestion((preQuestion) => ({
      ...preQuestion,
      [name]: newValue,
    }));
  };

  const onChangeImages = (name: string, newValue: FileList | null) => {
    setQuestion((preQuestion) => ({
      ...preQuestion,
      [name]: newValue,
    }));
  };

  const handleAddNewQuestion = async () => {
    const {
      year,
      practiceSet,
      part,
      order,
      images,
      audio,
      topic,
      answer_a,
      answer_b,
      answer_c,
      answer_d,
      correct_answer,
    } = question;

    console.log(year);

    await addNewQuestion(
      year,
      practiceSet,
      part,
      order,
      images,
      audio,
      topic,
      answer_a,
      answer_b,
      answer_c,
      answer_d,
      correct_answer
    );
  };

  const navigate = useNavigate();

  const config = {
    parts: ["All"],
  };

  let listPart =
    config.parts[0] === "All"
      ? ["part1", "part2", "part3", "part4", "part5", "part6", "part7"]
      : config.parts;

  const [selectedTab, setSelectedTab] = useState<string>(listPart[0]);
  const [spentTime, setSpentTime] = useState<number>(0);

  const [exam, setExam] = useState<any>();

  const [timeFrame, setTimeFrame] = useState();

  useEffect(() => {
    const fetchExamById = async () => {
      try {
        const response = await ExamAPI.getById("1");
        setExam(response.exam);
        console.log(response.exam);
      } catch (error) {
        console.error("Error fetching preview exams:", error);
      }
    };

    fetchExamById();
  }, []);

  console.log('')

  return (
    <div className="ml-48 p-4">
      <div className="fixed top-0 left-0 h-screen px-3 py-4 overflow-y-auto bg-gray-800 space-y-2 font-medium">
        <div>
          <Link
            to={"/admin"}
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <svg
              className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 21"
            >
              <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
              <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
            </svg>
            <span className="ms-3">Dashboard</span>
          </Link>
        </div>
        <div>
          <a
            href="#"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
            </svg>
            <span className="flex-1 ms-3 whitespace-nowrap">Bài thi</span>
            <span className="indivne-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
              Pro
            </span>
          </a>
        </div>
        <div>
          <a
            href="#"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="flex-1 ms-3 whitespace-nowrap">Thông báo</span>
            <span className="indivne-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
              3
            </span>
          </a>
        </div>
        <div>
          <a
            href="#"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
            </svg>
            <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
          </a>
        </div>
        <div>
          <a
            href="#"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
            </svg>
            <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
          </a>
        </div>
        <div>
          <a
            href="#"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 16"
            >
              <path
                stroke="currentColor"
                stroke-divnecap="round"
                stroke-divnejoin="round"
                stroke-width="2"
                d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
              />
            </svg>
            <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
          </a>
        </div>
      </div>

      {/* <div className="flex justify-between">
        <div className="bg-white p-4">
          <PartTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </div>
        <MarkCells parts={parts} exam={[]} />
      </div> */}

      {/* <PracticePartTabs
        listPartTabs={listPart}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      <QuestionBoxs
        part={selectedTab}
        listQuestion={exam.parts[selectedTab] || {}}
        handleSaveAnswer={handleSaveAnswer}
      />

      <QuestionMarkCells parts={listPart} exam={exam} /> */}

      <div>
        <div className="mx-auto bg-white p-4">
          <h3 className="text-lg">Thêm câu hỏi</h3>
          <div className="flex items-center gap-8">
            <div className="mb-5 w-40">
              <label
                htmlFor="part"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Part
              </label>
              {/* <input
                type="text"
                id="part"
                value={question.part}
                name="part"
                onChange={(e) => onChangeValue(e.target.name, e.target.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder=""
                required
              /> */}
              <Listbox value={timeFrame} onChange={setTimeFrame}>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">Part 1</span>
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
                              active
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-900"
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
            <div className="mb-5 w-32">
              <label
                htmlFor="order"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Số thứ tự câu hỏi
              </label>
              <input
                type="text"
                id="order"
                value={question.order}
                name="order"
                onChange={(e) => onChangeValue(e.target.name, e.target.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
            </div>

            <div className="mb-5 w-80">
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Ảnh
              </label>
              <input
                type="file"
                id="images"
                // value={question.images}
                name="images"
                onChange={(e) => onChangeImages(e.target.name, e.target.files)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
            </div>

            <div className="mb-5 w-80">
              <label
                htmlFor="audio"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Âm thanh
              </label>
              <input
                type="file"
                id="audio"
                name="audio"
                onChange={(e) => onChangeImages(e.target.name, e.target.files)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="correct_answer"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Đáp án đúng
              </label>
              {/* <input
                type="text"
                id="correct_answer"
                name="correct_answer"
                value={question.correct_answer}
                onChange={(e) => onChangeValue(e.target.name, e.target.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              /> */}
              <Listbox value={timeFrame} onChange={setTimeFrame}>
                <div className="relative w-60">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">Đáp án A</span>
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
                              active
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-900"
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

          <div className="mb-5">
            <label
              htmlFor="topic"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Câu hỏi
            </label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={question.topic}
              onChange={(e) => onChangeImages(e.target.name, e.target.files)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor=""
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Đáp án A
            </label>
            <input
              type="text"
              id="answer_a"
              name="answer_a"
              value={question.answer_a}
              onChange={(e) => onChangeImages(e.target.name, e.target.files)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="answer_b"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Đáp án B
            </label>
            <input
              type="text"
              id="answer_b"
              name="answer_b"
              value={question.answer_b}
              onChange={(e) => onChangeImages(e.target.name, e.target.files)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="answer_c"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Đáp án C
            </label>
            <input
              type="text"
              id="answer_c"
              name="answer_c"
              value={question.answer_c}
              onChange={(e) => onChangeImages(e.target.name, e.target.files)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor=""
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Đáp án D
            </label>
            <input
              type="text"
              id="answer_d"
              name="answer_d"
              value={question.answer_d}
              onChange={(e) => onChangeImages(e.target.name, e.target.files)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>

          <button
            onClick={handleAddNewQuestion}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
