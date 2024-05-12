import {
  BookOpenIcon,
  ClockIcon,
  CursorArrowRippleIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { secondsToMinutes } from "../../../util/date";

interface GeneralBoxsProps {
  practiceTotal: number;
  takenExamTotal: number;
  spentTimeTotal: number;
  correctTotal: number;
  questionTotal: number;
  className?: string;
}

const GeneralBoxs: React.FC<GeneralBoxsProps> = (props) => {
  const {
    practiceTotal,
    takenExamTotal,
    spentTimeTotal,
    correctTotal,
    questionTotal,
    className,
  } = props;
  return (
    <div className={`flex gap-5 ${className}`}>
      <div className="w-40 flex flex-col items-center justify-center gap-1 border border-solid border-gray-200 rounded-md p-4 pb-8 shadow">
        <PencilIcon className="w-8 h-8 text-gray-500" />
        <h3 className="font-semibold text-gray-500">Số lượt thi</h3>
        <h3 className="font-bold text-2xl">{practiceTotal}</h3>
        <h3>Lượt</h3>
      </div>

      <div className="w-40 flex flex-col items-center justify-center gap-1 border border-solid border-gray-200 rounded-md p-4 pb-8 shadow">
        <BookOpenIcon className="w-8 h-8 text-gray-500" />
        <h3 className="font-semibold text-gray-500">Số đề thi đã làm</h3>
        <h3 className="font-bold text-2xl">{takenExamTotal}</h3>
        <h3>Đề thi</h3>
      </div>

      <div className="w-40 flex flex-col items-center justify-center gap-1 border border-solid border-gray-200 rounded-md p-4 pb-8 shadow">
        <ClockIcon className="w-8 h-8 text-gray-500" />
        <h3 className="font-semibold text-gray-500 text-center  ">
          Thời gian luyện
        </h3>
        <h3 className="font-bold text-2xl">
          {secondsToMinutes(spentTimeTotal)}
        </h3>
        <h3>phút</h3>
      </div>

      <div className="w-40 flex flex-col items-center justify-center gap-1 border border-solid border-gray-200 rounded-md p-4 pb-8 shadow">
        <CursorArrowRippleIcon className="w-8 h-8 text-gray-500" />
        <h3 className="font-semibold text-gray-500">Độ chính xác</h3>
        <h3 className="font-bold text-2xl">
          {Math.round((correctTotal / questionTotal) * 100)}
        </h3>
        <h3>#correct/#total</h3>
      </div>
    </div>
  );
};

export default GeneralBoxs;
