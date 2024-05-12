import { useEffect, useState } from "react";
import LineChart from "./components/lineChart";
import StatisticAPI from "../../API/statisticAPI";
import { PARTS, TIME_FRAME } from "./utils/config";
import SearchTimeFrame from "./components/searchTimeFrame";
import GeneralBoxs from "./components/generalBoxs";
import PartTabs from "./components/partTabs";
import StatisticBoxByPart from "./components/statisticBoxByPart";
import ExamHistoriesByPart from "./components/examHistoriesByPart";

const Statistic = () => {
  const [statistic, setStatistic] = useState<any>();
  const [statisticByPart, setStatisticByPart] = useState<any>();
  const [timeFrame, setTimeFrame] = useState(TIME_FRAME[0]);
  const [part, setPart] = useState(PARTS[0]);

  const fetchStatistic = async (timeFrame: number) => {
    try {
      const statistic = await StatisticAPI.get(timeFrame);
      setStatistic(statistic);
    } catch (error) {
      console.error("Error fetching preview exams:", error);
    }
  };

  const fetchStatisticByPart = async () => {
    try {
      const data = await StatisticAPI.getByPart(timeFrame.value, part.value);
      console.log("statistic: ", data);
      setStatisticByPart(data);
    } catch (error) {
      console.error("Error fetching statistic by part:", error);
    }
  };

  useEffect(() => {
    fetchStatistic(3650);
    fetchStatisticByPart();
  }, []);

  useEffect(() => {
    fetchStatistic(timeFrame.value);
  }, [timeFrame]);

  useEffect(() => {
    fetchStatisticByPart();
  }, [part]);

  return (
    <div className="bg-white p-8 pb-12">
      <div className="container mx-auto space-y-6">
        <h2 className="font-bold text-2xl ">Thống kê kết quả luyện thi</h2>

        <SearchTimeFrame
          className="space-y-2"
          timeFrame={timeFrame}
          setTimeFrame={setTimeFrame}
          fetchStatistic={fetchStatistic}
        />

        {statistic && (
          <GeneralBoxs
            practiceTotal={statistic.examHistories.length}
            takenExamTotal={statistic.exams.length}
            spentTimeTotal={statistic.spentTimeTotal}
            correctTotal={statistic.correctTotal}
            questionTotal={statistic.questionTotal}
          />
        )}

        {statistic && <LineChart datasets={statistic?.accuracies} />}

        <PartTabs part={part} setPart={setPart} />

        {statisticByPart && (
          <StatisticBoxByPart
            practiceTotal={statisticByPart.examHistories.length}
            takenExamTotal={statisticByPart.exams.length}
            spentTimeTotal={statisticByPart.spentTimeTotal}
            correctTotal={statisticByPart.correctTotal}
            accuracies={statisticByPart.accuracies}
            questionTotal={statistic.questionTotal}
          />
        )}

        {statisticByPart && (
          <ExamHistoriesByPart examHistories={statisticByPart.examHistories} />
        )}
      </div>
    </div>
  );
};

export default Statistic;
