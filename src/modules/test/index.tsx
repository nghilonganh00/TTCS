import { Link, useNavigate, useNavigation } from "react-router-dom";
import ExamHistoryTable from "./components/examHistoryTable";
import PracticeConfig from "./components/practiceConfig";
import { useEffect, useState } from "react";
import ExamAPI from "../../API/ExamAPI";
import { Exam } from "../../global/interfaces/interfaces";
import CommentArea from "./components/commentArea";
import CommentAPI from "../../API/commentAPI";
import GeneralArea from "./components/generalArea";
import {
  ChartBarIcon,
  ClockIcon,
  CursorArrowRippleIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

const Test = () => {
  const navigate = useNavigate();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const testId = urlParams.get("id");

  const [test, setTest] = useState<Exam>();
  const [practiceConfig, setPraticeConfig] = useState({
    examId: testId,
    duration: 0,
    parts: [],
  });

  const handlePractice = () => {
    const { examId, duration, parts } = practiceConfig;
    navigate("/practice", {
      state: {
        config: {
          examId: examId,
          duration: duration,
          parts: parts.sort(),
        },
      },
    });
  };

  const handleAddComment = async (content: string) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const examId = urlParams.get("id") || "1";

    const newComment = await CommentAPI.add(examId, content);
    console.log("new comment: ", newComment);
  };

  useEffect(() => {
    if (testId) {
      const fetchExamById = async () => {
        try {
          const response = await ExamAPI.getById(testId);
          setTest(response);
        } catch (error) {
          console.error("Error fetching preview exams:", error);
        }
      };

      fetchExamById();
    }
  }, []);

  return (
    <div className="bg-gray-50 p-5">
      <div className="flex gap-10 container mx-auto">
        <div className="flex-1 border border-solid border-gray-300 rounded-md p-4 bg-white">
          <div className="space-y-5">
            <GeneralArea
              title={test?.generalInfo.title}
              commentTotal={test?.generalInfo.commentTotal}
              practiceTotal={test?.generalInfo.practiceTotal}
            />

            <ExamHistoryTable className="" list={test?.history} />

            <PracticeConfig
              config={practiceConfig}
              setConfig={setPraticeConfig}
            />

            <button
              onClick={handlePractice}
              className="text-white font-semibold text-base bg-blue-800 border-2 border-gray-300 focus:outline-none 
                        rounded-lg px-7 py-2.5 me-2 mb-2 hover:text-white hover:bg-blue-900"
            >
              Luyện tập
            </button>
          </div>
          <div className="w-full mt-5 border-t border-solid border-gray-600"></div>

          {test && (
            <CommentArea
              list={test.comments}
              handleAddComment={handleAddComment}
            />
          )}
        </div>

        <div className=" w-72 h-80 flex flex-col bg-white shadow-md rounded-lg p-6 space-y-3">
          <div className="flex items-center gap-1 pl-6">
            <ChartBarIcon className="w-6 h-6" />
            <h2 className="text-center text-xl font-semibold">
              Thống kê cá nhân
            </h2>
          </div>
          <div className="space-y-2">
            <div className="flex">
              <div className="w-36 flex items-center gap-1">
                <PencilIcon className="w-4 h-4" />
                <span>Đã luyện tập:</span>
              </div>
              <div className="font-semibold">1200 lượt</div>
            </div>
            <div className="flex">
              <div className="w-36 flex items-center gap-1">
                <CursorArrowRippleIcon className="w-4 h-4" />
                <span>Độ chính xác: </span>
              </div>
              <div className="font-semibold">40.45%</div>
            </div>
            <div className="flex">
              <div className="w-36 flex items-center gap-1">
                <ClockIcon className="w-4 h-4" />
                <span>Tổng thời gian: </span>
              </div>
              <div className="font-semibold">1200 phút</div>
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

          {/* <h4>Thống kê từng phần</h4> */}
          {/* <div>
            <div className="flex gap-2">
              <span>Part 1</span>
              <span>1200 lượt thi</span>
              <span>50%</span>
            </div>

            <div className="flex gap-2">
              <span>Part 2</span>
              <span>1230 lượt thi</span>
              <span>42%</span>
            </div>

            <div className="flex gap-2">
              <span>Part 3</span>
              <span>1200 lượt thi</span>
              <span>50%</span>
            </div>

            <div className="flex gap-2">
              <span>Part 4</span>
              <span>1200 lượt thi</span>
              <span>50%</span>
            </div>

            <div className="flex gap-2">
              <span>Part 5</span>
              <span>1200 lượt thi</span>
              <span>50%</span>
            </div>
            <div className="flex gap-2">
              <span>Part 6</span>
              <span>1200 lượt thi</span>
              <span>50%</span>
            </div>
            <div className="flex gap-2">
              <span>Part 7</span>
              <span>1200 lượt thi</span>
              <span>50%</span>
            </div>
            <div className="flex gap-2">
              <span>Part 4</span>
              <span>1200 lượt thi</span>
              <span>50%</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Test;
