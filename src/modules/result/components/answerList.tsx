import React, { useEffect, useState } from "react";
import { PART_TABS } from "../../practice/utils/config";
import Popup from "../../../global/components/Popup";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import ExplaintionBox from "./explantionBox";
import ExamAPI from "../../../API/ExamAPI";

interface AnswerBoxProps {
  part: string;
  questionNumber: string;
  userAnswer: string;
  correctAnswer: string;
}

interface AnswerListOfPartProps {
  part: string;
  answerList: {
    [questionNumber: string]: {
      [key: string]: string;
    };
  };
}

interface AnswerListProps {
  result: {
    [part: string]: {
      [questionNumber: string]: {};
    };
  };
  parts: string[];
}

const AnswerBox: React.FC<AnswerBoxProps> = (props) => {
  const { part, questionNumber, userAnswer, correctAnswer } = props;
  const [explaintion, setExplaintion] = useState(`<div>
                    Giải thích: Cần 1 tính từ để bổ sung cho danh từ "goods".
                  </div>

                  <div> Đáp án đúng là A.</div>

                  <div>
                    Dịch: Mougey Fine Gifts nổi tiếng vì có nhiều loại hàng hóa
                    địa phương.
                  </div>

                  <p>Từ vựng:</p>`);

  const [question, setQuestion] = useState<any>();

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    const fetchQuestion = async () => {
      try {
        const response = await ExamAPI.getQuestionById(
          "1",
          part,
          questionNumber
        );
        console.log(question);
        setQuestion(response);
      } catch (error) {
        console.error("Error fetching preview exams:", error);
      }
    };
    setShowPopup(!showPopup);
    fetchQuestion();
  };

  return (
    <div className="flex gap-4 items-center">
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-200 ">
        <p className="font-semibold text-sm text-blue-800">{questionNumber}</p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-green-500 font-semibold">{correctAnswer}: </span>
        <span className="text-blue-600 font-semibold">{userAnswer}</span>

        <span className="text-red-600 font-bold">
          {correctAnswer === userAnswer ? " " : "x"}
        </span>
      </div>
      <span
        className="text-blue-600 hover:underline hover:cursor-pointer"
        onClick={togglePopup}
      >
        [Giải thích]
      </span>

      {question && (
        <ExplaintionBox
          togglePopup={togglePopup}
          examId={"1"}
          part={part}
          questionNumber={questionNumber}
          isShow={showPopup}
          question={question}
        />
      )}
    </div>
  );
};

const AnswerListOfPart: React.FC<AnswerListOfPartProps> = (props) => {
  const { part, answerList } = props;
  return (
    <div className="mb-4">
      <h3 className="font-semibold">{PART_TABS[part]}</h3>

      <div className="space-y-3">
        {Object.keys(answerList).map((questionNumber: string) => {
          const { userAnswer, correctAnswer } = answerList[questionNumber];
          return (
            <AnswerBox
              part={part}
              questionNumber={questionNumber}
              userAnswer={userAnswer}
              correctAnswer={correctAnswer}
            />
          );
        })}
      </div>
    </div>
  );
};

const AnswerList: React.FC<AnswerListProps> = (props) => {
  const { result, parts } = props;
  return (
    <div>
      <h3 className="font-semibold text-xl mt-8 mb-4">Chi tiết đáp án</h3>

      {parts.map((part: string) => {
        const answerList = result[part];
        return <AnswerListOfPart part={part} answerList={answerList} />;
      })}
    </div>
  );
};

export default AnswerList;
