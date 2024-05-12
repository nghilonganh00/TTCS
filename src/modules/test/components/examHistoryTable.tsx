import React from "react";
import { secondsToTime } from "../../../util/date";
import { PART_TABS } from "../../practice/utils/config";
import { Link, useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

interface ExamHistoryRecordProps {
  id: string;
  examedAt: Timestamp;
  spentTime: string;
  correctTotal: string;
  questionTotal: string;
  parts: string[];
}

interface ExamHistoryTableProps {
  className: string;
  list: ExamHistoryRecordProps[];
}

const ExamHistoryRecord: React.FC<ExamHistoryRecordProps> = (props) => {
  const { id, spentTime, examedAt, correctTotal, questionTotal, parts } = props;

  return (
    <tr className="even:bg-white odd:bg-gray-200 border-y border-gray-500">
      <th scope="row" className="pl-4 py-4 font-medium  whitespace-nowrap">
        {new Date(examedAt.seconds * 1000).toLocaleString()}
      </th>
      <td className="py-4 text-center">{`${correctTotal}/${questionTotal}`}</td>
      <td className="py-4 text-center">{secondsToTime(parseInt(spentTime))}</td>
      <td className=" px-0 py-4 flex flex-wrap gap-1">
        {parts?.map((part) => (
          <div className="w-14 h-5 flex items-center justify-center bg-yellow-500 text-white rounded-md">
            {PART_TABS[part]}
          </div>
        ))}
      </td>
      <td className="py-4">
        <Link
          to={`/result?id=${id}`}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Xem chi tiết
        </Link>
      </td>
    </tr>
  );
};

const ExamHistoryTable: React.FC<ExamHistoryTableProps> = (props) => {
  const { className, list } = props;
  console.log("list: ", list);
  return (
    <div className={`${className}`}>
      <p className="font-bold">Kết quả làm bài của bạn:</p>

      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg mt-3">
        <table
          className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ${className}`}
        >
          <thead className="text-md text-black uppercase bg-white">
            <tr>
              <th scope="col" className="pl-4 py-3 ">
                Ngày làm
              </th>
              <th scope="col" className=" py-3 text-center">
                Kết quả
              </th>
              <th scope="col" className=" py-3 text-center">
                Thời gian làm
              </th>
              <th scope="col" className="py-3"></th>
              <th scope="col" className=" py-3"></th>
            </tr>
          </thead>
          <tbody className="text-gray-900 font-semibold">
            {list?.map((record, key) => {
              const {
                id,
                parts,
                correctTotal,
                questionTotal,
                spentTime,
                examedAt,
              } = record;
              return (
                <ExamHistoryRecord
                  id={id}
                  examedAt={examedAt}
                  spentTime={spentTime}
                  correctTotal={correctTotal}
                  questionTotal={questionTotal}
                  parts={parts?.sort()}
                  key={key}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamHistoryTable;
