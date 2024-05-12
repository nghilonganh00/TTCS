import { useState } from "react";
import CountdownTimer from "./countdownTimer";
import PracticePartTabs from "./practicePartTabs";
import QuestionBoxs from "./questionBoxs";
import QuestionMarkCells from "./questionMarkCells";
import { PartKey, UserAnswers } from "../../../global/interfaces/interfaces";
import NextButton from "./nextButton";
import SubmitButton from "./submitButton";
import ExamAPI from "../../../API/ExamAPI";
import { useNavigate } from "react-router-dom";

interface PraticeContentProps {
  examId: string;
  exam: any;
  config: any;
  userAnswers: UserAnswers;
  setUserAnswers: React.Dispatch<React.SetStateAction<UserAnswers>>;
}

const PracticeContent: React.FC<PraticeContentProps> = (props) => {
  const navigate = useNavigate();
  const { examId, exam, config, userAnswers, setUserAnswers } = props;
  const { duration, parts } = config;
  const { title } = exam;

  let listPart =
    config.parts[0] === "All"
      ? ["part1", "part2", "part3", "part4", "part5", "part6", "part7"]
      : config.parts;

  const [selectedTab, setSelectedTab] = useState<PartKey>(listPart[0]);

  let totalSecondsLeft = duration * 60;
  const calculateTimeLeft = (): { minutes: number; seconds: number } => {
    totalSecondsLeft -= 1;
    let minutes = Math.floor(totalSecondsLeft / 60);
    let seconds = totalSecondsLeft % 60;

    if (totalSecondsLeft <= 0) {
      minutes = 0;
      seconds = 0;
      handleFinish();
    }
    return { minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const handleNextPart = () => {
    setSelectedTab((prev: PartKey) => {
      const currPartIdx = config.parts.indexOf(prev);
      return currPartIdx === config.parts.length - 1
        ? config.parts[0]
        : config.parts[currPartIdx + 1];
    });
  };

  const handleSaveAnswer = (
    part: string,
    questionNumber: string,
    answer: string
  ) => {
    setUserAnswers((prev: UserAnswers) => {
      let prevUserAnswer = prev;
      if (!prevUserAnswer[part]) {
        prevUserAnswer[part] = {};
      }
      prevUserAnswer[part][questionNumber] = answer;
      return prevUserAnswer;
    });
  };

  const handleFinish = async () => {
    const spentTime =
      duration * 60 - (timeLeft.minutes * 60 + timeLeft.seconds);
    const result = await ExamAPI.grade(examId, userAnswers, parts, spentTime);

    if (result) {
      navigate(`/result?id=${result.examHistoryId}`);
    }
  };

  const handleOnSubmit = () => {
    if (Object.keys(userAnswers).length === 0) {
      if (
        window.confirm("Bạn chưa trả lời câu nào. Bạn có muốn nộp bài không ?")
      ) {
        handleFinish();
      }
    } else {
      if (window.confirm("Bạn có muốn nộp bài không ?")) {
        console.log("Approve submit");
        handleFinish();
      }
    }

    return;
  };

  return (
    <div className="flex gap-4 relative">
      <div className="flex-1 bg-white p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>

        <PracticePartTabs
          listPartTabs={listPart}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        <QuestionBoxs
          part={selectedTab}
          listQuestion={exam.parts[selectedTab] || {}}
          handleSaveAnswer={handleSaveAnswer}
        />

        <NextButton onClick={handleNextPart} />
      </div>

      <div className="w-60 h-full bg-white p-4 rounded-lg sticky top-0">
        <CountdownTimer
          durationMinutes={duration}
          calculateTimeLeft={calculateTimeLeft}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
        />

        <QuestionMarkCells parts={listPart} exam={exam} />

        <SubmitButton onClick={handleOnSubmit} />
      </div>
    </div>
  );
};

export default PracticeContent;
