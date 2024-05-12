import {
  ChartBarIcon,
  ClockIcon,
  CursorArrowRippleIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import StatisticAPI from "../../../API/statisticAPI";
import { useEffect, useState } from "react";
import { secondsToMinutes } from "../../../util/date";

interface StatisticBoxProps {
  examId: string;
}

const StatisticBox: React.FC<StatisticBoxProps> = (props) => {
  const { examId } = props;
  const [statistic, setStatistic] = useState<any>();
  const fetchStatisticByExamId = async () => {
    try {
      const data = await StatisticAPI.getByExamId(examId);
      setStatistic(data);
      console.log("statistic: ", data);
    } catch (error) {
      console.error("Error fetching preview exams:", error);
    }
  };

  useEffect(() => {
    fetchStatisticByExamId();
  }, []);

  return (
    <div className=" w-72 h-80 flex flex-col bg-white shadow-md rounded-lg p-6 space-y-3">
      <div className="flex items-center gap-1 pl-6">
        <ChartBarIcon className="w-6 h-6" />
        <h2 className="text-center text-xl font-semibold">Thống kê cá nhân</h2>
      </div>
      <div className="space-y-2">
        <div className="flex">
          <div className="w-36 flex items-center gap-1">
            <PencilIcon className="w-4 h-4" />
            <span>Đã luyện tập:</span>
          </div>
          <div className="font-semibold">{statistic?.examHistories.length}</div>
        </div>
        <div className="flex">
          <div className="w-36 flex items-center gap-1">
            <CursorArrowRippleIcon className="w-4 h-4" />
            <span>Độ chính xác: </span>
          </div>
          <div className="font-semibold">
            {Math.round(
              (statistic?.correctTotal / statistic?.questionTotal) * 100
            )}
            %
          </div>
        </div>
        <div className="flex">
          <div className="w-36 flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            <span>Tổng thời gian: </span>
          </div>
          <div className="font-semibold">
            {secondsToMinutes(statistic?.spentTimeTotal)} phút
          </div>
        </div>
        <div className="flex">
          <div className="w-36">Điểm Listening: </div>
          <div className="font-semibold">32</div>
        </div>
        <div className="flex">
          <div className="w-36">Điểm Reading: </div>
          <div className="font-semibold">31</div>
        </div>
        <div className="flex">
          <div className="w-36">Tổng điểm: </div>
          <div className="font-semibold">63</div>
        </div>
      </div>
      <Link
        to={"/statistic"}
        className="mx-auto px-10 py-1 border-2 border-solid border-blue-800 rounded-full text-blue-800 font-semibold
                            hover:bg-blue-800 hover:text-white"
      >
        Xem thống kê chi tiết
      </Link>
    </div>
  );
};

export default StatisticBox;
