import { useEffect, useState } from "react";
import ExamHistoryAPI from "../../API/ExamHistoryAPI";
import ScoresBox from "./components/scoresBox";
import AnswerList from "./components/answerList";
import StatisticBox from "./components/statisticBox";

interface ExamHistory {
  examId: string;
  userId: string;
  parts: string[];
  result: {};
  correctTotal: number;
  questionTotal: number;
  spentTime: number;
  examedAt: string;
  listeningCorrect: number;
  readingCorrect: number;
  listeningScore: number;
  readingScore: number;
  totalScore: number;
}

const Result = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const examHistoryId = urlParams.get("id");

  const [examHistory, setExamHistory] = useState<ExamHistory>();

  const fetchExamHistoryById = async () => {
    try {
      if (examHistoryId) {
        const examHistoryData = await ExamHistoryAPI.getById(examHistoryId);
        setExamHistory(examHistoryData);
        console.log("exam history: ", examHistoryData);
      }
    } catch (error) {
      console.error("Error fetching preview exams:", error);
    }
  };

  useEffect(() => {
    if (examHistoryId) {
      fetchExamHistoryById();
    }
  }, []);

  return (
    <div className="p-4 bg-gray-50">
      {examHistory && (
        <div className="flex flex-wrap gap-10">
          <div className="flex-1 bg-white p-8 rounded-lg">
            <ScoresBox
              correctTotal={examHistory.correctTotal}
              questionTotal={examHistory.questionTotal}
              spentTime={examHistory.spentTime}
              listeningCorrect={examHistory.listeningCorrect}
              readingCorrect={examHistory.readingCorrect}
              listeningScore={examHistory.listeningScore}
              readingScore={examHistory.readingScore}
              totalScore={examHistory.totalScore}
            />

            <AnswerList
              result={examHistory.result}
              parts={
                examHistory.parts[0] === "All"
                  ? [
                      "part1",
                      "part2",
                      "part3",
                      "part4",
                      "part5",
                      "part6",
                      "part7",
                    ]
                  : examHistory.parts
              }
            />
          </div>

          <StatisticBox examId={examHistory.examId} />
        </div>
      )}
    </div>
  );
};

export default Result;
