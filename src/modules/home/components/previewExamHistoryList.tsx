import { Link } from "react-router-dom";
import { Timestamp, secondsToTime } from "../../../util/date";
import { PART_TABS } from "../../practice/utils/config";

interface ExamHistoryPreview {
  id: string;
  examId: string;
  examTitle: string;
  parts: string[];
  correctTotal: number;
  questionTotal: number;
  spentTime: number;
  examedAt: string;
}

interface PreviewExamHistoryListProps {
  list: any[];
}

const PreviewExamHistoryBox: React.FC<ExamHistoryPreview> = (props) => {
  const {
    id,
    examId,
    examTitle,
    parts,
    correctTotal,
    questionTotal,
    spentTime,
    examedAt,
  } = props;

  return (
    <Link
      to={{
        pathname: "/result",
        search: `?id=${id}`,
      }}
      type="button"
    >
      <div className="w-56 p-4 border border-solid border-slate-300 rounded-lg space-y-2 shadow-md ">
        <h1 className="font-bold leading-5">{examTitle}</h1>

        <div>
          {parts?.map((part) => (
            <div className="w-12 h-5 flex items-center justify-center text-sm bg-yellow-400 text-white rounded-md">
              {PART_TABS[part]}
            </div>
          ))}
        </div>
        <div className="font-semibold leading-tight pb-4">
          <div className="flex items-center text-gray-600 gap-1">
            <p className="">{`Ngày làm: ${Timestamp.toDDMMYYYY(examedAt)}`}</p>
          </div>
          <div className="flex items-center text-gray-600 gap-1">
            <p className="">{`Thời gian làm: ${secondsToTime(spentTime)}`}</p>
          </div>

          <div className="flex items-center text-gray-600 gap-1">
            <p className="">{`Kết quả: ${correctTotal}/${questionTotal}`}</p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Link
            to={{
              pathname: "/test/",
              search: "?id=1",
            }}
            type="button"
            className="text-blue-900 font-semibold text-base bg-white border-2 border-gray-300 focus:outline-none 
                    rounded-lg px-7 py-2.5 me-2 mb-2"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </Link>
  );
};

const PreviewExamHistoryList: React.FC<PreviewExamHistoryListProps> = (
  props
) => {
  const { list } = props;
  return (
    <div>
      <h3 className="font-bold text-2xl mb-1 text-blue-700">
        Các bài thi đã làm
      </h3>
      <div className="bg-white w-full px-6 py-4 rounded-md flex gap-7 overflow-x-auto">
        {list.map((previewExam: any, index) => {
          const {
            id,
            examId,
            examTitle,
            examedAt,
            correctTotal,
            parts,
            questionTotal,
            spentTime,
          } = previewExam;

          return (
            <PreviewExamHistoryBox
              key={index}
              id={id}
              examId={examId}
              examTitle={examTitle}
              examedAt={examedAt}
              correctTotal={correctTotal}
              parts={parts}
              questionTotal={questionTotal}
              spentTime={spentTime}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PreviewExamHistoryList;
