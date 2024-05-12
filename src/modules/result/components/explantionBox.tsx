import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Popup from "../../../global/components/Popup";
import { Fragment, useEffect, useState } from "react";
import ExamAPI from "../../../API/ExamAPI";
import ReactPlayer from "react-player";

interface ExplaintionBoxProps {
  togglePopup: () => void;
  examId: string;
  part: string;
  questionNumber: string;
  isShow: boolean;
  question: any;
}

const ExplaintionBox: React.FC<ExplaintionBoxProps> = (props) => {
  const { togglePopup, questionNumber, isShow, question } = props;

  const { topic, answers, correctAnswer, audio, image, explaintion } = question;

  return (
    <Fragment>
      {isShow && (
        <Popup onClose={togglePopup}>
          <div className="h-96 overflow-y-scroll">
            <div>
              <div className="flex items-center justify-between gap-5">
                <h3 className="font-bold text-xl">
                  #Đáp án chi tiết {questionNumber}
                </h3>
                <div className="flex items-center gap-1 border border-solid border-red-500 text-red-500 rounded-full px-2 hover:cursor-pointer">
                  <ExclamationTriangleIcon className="w-4 h-4" />
                  <span className="text-sm">Báo lỗi</span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-500 my-2">
                Practice Set TOEIC 2023 Test 1
              </h3>
            </div>

            <div className="h-0.5 bg-gray-200 my-4"></div>

            {audio !== "" && (
              <ReactPlayer
                url={audio}
                width="400px"
                height="50px"
                playing={false}
                controls={true}
              />
            )}
            <img src={image} alt="" className="max-w-2xl" />
            <div className="flex gap-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-200 ">
                <p className="font-semibold text-sm text-blue-800">
                  {questionNumber}
                </p>
              </div>

              <div className="space-y-2">
                <h4>{topic}</h4>

                <div>
                  <div className="flex items-center gap-1">
                    <input type="radio" disabled checked />
                    {answers.A}
                  </div>
                  <div className="flex items-center gap-1">
                    <input type="radio" disabled />
                    {answers.B}
                  </div>
                  <div className="flex items-center gap-1">
                    <input type="radio" disabled />
                    {answers.C}
                  </div>
                  <div className="flex items-center gap-1">
                    <input type="radio" disabled />
                    {answers.D}
                  </div>
                </div>
                <h3 className="text-green-400">Đáp án đúng: {correctAnswer}</h3>

                <div>
                  <h3 className="text-blue-700 font-semibold">
                    Giải thích chi tiết
                  </h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: explaintion || "",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </Fragment>
  );
};

export default ExplaintionBox;
