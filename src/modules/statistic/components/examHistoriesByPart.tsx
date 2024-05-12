import React from "react";
import { Link } from "react-router-dom";
import { Timestamp, secondsToMinutes, secondsToTime } from "../../../util/date";
import { PART_TABS } from "../../practice/utils/config";

interface ExamHistoriesByPartProps {
  examHistories: any[];
}

interface ExamHistoryProps {
  examedAt: string;
  examTitle: string;
  correctTotal: number;
  questionTotal: number;
  spentTime: number;
  parts: string[];
}

const ExamHistory: React.FC<ExamHistoryProps> = (props) => {
  const { examedAt, examTitle, correctTotal, questionTotal, spentTime, parts } =
    props;

  return (
    <tr className="even:bg-white odd:bg-gray-200 border-y border-gray-500">
      <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap">
        {examedAt}
      </th>
      <td className="px-6 py-4">{examTitle}</td>
      <td className="px-6 py-4">{`${correctTotal}/${questionTotal}`}</td>
      <td className="px-6 py-4 flex gap-1">{secondsToTime(spentTime)}</td>
      <td className="px-6 py-4">
        {parts?.map((part) => (
          <div className="w-14 h-5 flex items-center justify-center bg-yellow-500 text-white rounded-md">
            {PART_TABS[part]}
          </div>
        ))}
      </td>
      <td className="px-6 py-4">
        <Link
          to={`/result?`}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Xem chi tiết
        </Link>
      </td>
    </tr>
  );
};

const ExamHistoriesByPart: React.FC<ExamHistoriesByPartProps> = (props) => {
  const { examHistories } = props;

  return (
    <div>
      <h3 className="font-bold text-lg">Danh sách đề thi đã làm</h3>

      <table
        className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400`}
      >
        <thead className="text-md text-black uppercase bg-white">
          <tr>
            <th scope="col" className="px-6 py-3">
              Ngày làm
            </th>
            <th scope="col" className="px-6 py-3">
              Đề thi
            </th>
            <th scope="col" className="px-6 py-3">
              Kết quả
            </th>
            <th scope="col" className="px-6 py-3">
              Thời gian làm bài
            </th>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="text-gray-900 font-semibold">
          {examHistories.map((examHistory) => {
            const {
              examedAt,
              examTitle,
              correctTotal,
              questionTotal,
              spentTime,
              parts,
            } = examHistory;
            console.log("statistic: ", examHistory);

            return (
              <ExamHistory
                examedAt={Timestamp.toHHMMDDMMYYYY(examedAt)}
                examTitle={examTitle}
                correctTotal={correctTotal}
                questionTotal={questionTotal}
                spentTime={spentTime}
                parts={parts}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExamHistoriesByPart;
