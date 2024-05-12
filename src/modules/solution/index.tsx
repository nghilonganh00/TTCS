import PracticeContent from "../practice/components/praticeContent";
import { useState } from "react";
import { Question } from "../../global/interfaces/interfaces";
import PracticePartTabs from "../practice/components/practicePartTabs";
import QuestionBoxs from "../practice/components/questionBoxs";
import QuestionMarkCell from "../practice/components/questionMarkCells";

const partTabs = [
  "Part 1",
  "Part 2",
  "Part 3",
  "Part 4",
  "Part 5",
  "Part 6",
  "Part 7",
];

const Solution = () => {
  const [selectedTab, setSelectedTab] = useState<string>(partTabs[2]);

  return (
    <div className="px-5 mt-5">
      {/* <div className="flex gap-4 relative">
        <div className="flex-1 bg-white p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            Đáp án: Practice Set 2023 TOEIC Test 7
          </h3>

          <PracticePartTabs
            listPartTabs={partTabs}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />

          <QuestionBoxs listQuestion={listQuestion} />

          <div className="text-right">
            <span className="font-semibold text-blue-600 hover:underline hover:cursor-pointer">
              Tiếp theo
            </span>
          </div>
        </div>

        <div className="w-52 h-full bg-white p-4 rounded-lg sticky top-0">
          <div className="text-left">
            <p className="text-m">Thời gian còn lại:</p>
            <p className="text-xl font-bold">42:12</p>
          </div>

          <div className="text-left mt-4">
            <div>
              <p className="text-lg font-semibold">Part 5</p>
              <div className="flex flex-wrap gap-2">
                {listQuestion.map((question) => (
                  <QuestionMarkCell questionIdx={question.questionIdx} />
                ))}
              </div>
            </div>
          </div>

          <div className="w-full mt-5 flex items-center justify-center">
            <button
              type="button"
              className="text-blue-900 font-semibold text-base bg-white border-2 border-gray-300 focus:outline-none 
                    rounded-lg px-7 py-2.5 me-2 mb-2 hover:text-white hover:bg-blue-800"
            >
              Nộp bài
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Solution;
