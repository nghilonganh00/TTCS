import { secondsToTime } from "../../../util/date";
import { calculateCorrectRatio } from "../utils/grade";

interface ScoresBoxProps {
  correctTotal: number;
  questionTotal: number;
  spentTime: number;
  listeningCorrect: number;
  readingCorrect: number;
  listeningScore: number;
  readingScore: number;
  totalScore: number;
}

const ScoresBox: React.FC<ScoresBoxProps> = (props) => {
  const {
    correctTotal,
    questionTotal,
    spentTime,
    listeningCorrect,
    readingCorrect,
    listeningScore,
    readingScore,
    totalScore
  } = props;
  return (
    <div>
      <h3 className="font-bold text-2xl">
        Kết quả luyện tập: Practice Set 2023 TOEIC Test 1
      </h3>
      <div className="flex items-center mt-3">
        <button
          type="button"
          className="text-blue-900 font-semibold text-base bg-blue-50 border-2 border-gray-300 focus:outline-none 
                        rounded-lg px-4 py-0.5 me-2 mb-2 hover:text-white hover:bg-blue-800 hover:border-transparent"
        >
          Làm lại
        </button>
      </div>

      <div className="flex flex-wrap justify-between items-center">
        <div className="w-64 h-40 px-4 py-6 mb-4 space-y-4 bg-gray-50 shadow-md shadow-gray-200 rounded-sm">
          <div className="flex items-center justify-between">
            <div className="flex gap-1 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>

              <span className="">Kết quả làm bài:</span>
            </div>

            <span className="font-semibold">{`${correctTotal}/${questionTotal}`}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-1 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
                />
              </svg>

              <span>Độ chính xác:</span>
            </div>

            <span className="font-semibold">
              {calculateCorrectRatio(correctTotal, questionTotal)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-1 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <span>Tổng thời gian</span>
            </div>

            <span className="font-semibold">{secondsToTime(spentTime)}</span>

            {/* <span className="font-semibold">{secondsToTime(spentTime)}</span> */}
          </div>
        </div>

        <div className="w-56 h-40 px-4 py-6 mb-4 bg-gray-50 shadow-md text-center space-y-2">
          <h4 className="font-semibold text-xl text-gray-500">Listening</h4>
          <h3 className="font-semibold text-2xl">{listeningScore}</h3>
          <h4 className="font-semibold text-gray-500">{`${listeningCorrect}/100`}</h4>
        </div>

        <div className="w-56 h-40 px-4 py-6 mb-4 bg-gray-50 shadow-md text-center space-y-2">
          <h4 className="font-semibold text-xl text-gray-500">Reading</h4>
          <h3 className="font-semibold text-2xl">{readingScore}</h3>
          <h4 className="font-semibold text-gray-500">{`${readingCorrect}/100`}</h4>
        </div>

        <div className="w-56 h-40 px-4 py-6 mb-4 bg-gray-50 shadow-md text-center space-y-2">
          <h4 className="font-semibold text-xl text-green-600">Tổng điểm</h4>
          <h3 className="font-semibold text-2xl">{`${totalScore}`}</h3>
        </div>
      </div>
    </div>
  );
};

export default ScoresBox;
