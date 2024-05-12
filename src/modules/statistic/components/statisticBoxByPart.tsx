import { secondsToMinutes } from "../../../util/date";

interface StatisticBoxByPartProps {
  practiceTotal: number;
  takenExamTotal: number;
  spentTimeTotal: number;
  correctTotal: number;
  questionTotal: number;
  accuracies: number[];
  className?: string;
}

const StatisticBoxByPart: React.FC<StatisticBoxByPartProps> = (props) => {
  const {
    practiceTotal,
    takenExamTotal,
    spentTimeTotal,
    correctTotal,
    questionTotal,
    accuracies,
    className,
  } = props;
  return (
    <div className="flex gap-5">
      <div className="w-40 flex flex-col items-center justify-center gap-1 border border-solid border-gray-200 rounded-md p-2 shadow">
        <h3 className="font-semibold text-gray-500">Số đề thi đã làm</h3>
        <h3 className="font-bold text-2xl">{takenExamTotal}</h3>
        <h3>Đề thi</h3>
      </div>

      <div className="w-40 flex flex-col items-center justify-center gap-1 border border-solid border-gray-200 rounded-md p-2 shadow">
        <h3 className="font-semibold text-gray-500">Độ chính xác</h3>
        <h3 className="font-bold text-2xl">
          {Math.round(accuracies[0] * 100)}%
        </h3>
        <h3>#correct/#total</h3>
      </div>

      <div className="w-40 text-center flex flex-col items-center justify-center gap-1 border border-solid border-gray-200 rounded-md p-2 shadow">
        <h3 className="font-semibold text-gray-500">Thời gian luyện</h3>
        <h3 className="font-bold text-2xl">
          {secondsToMinutes(spentTimeTotal)}
        </h3>
        <h3>Phút</h3>
      </div>
    </div>
  );
};

export default StatisticBoxByPart;
