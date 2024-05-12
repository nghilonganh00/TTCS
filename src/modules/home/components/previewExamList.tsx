import { Link } from "react-router-dom";
import TimeIcon from "../../../global/icons/timeIcon";
import { PreviewExam } from "../../../global/interfaces/interfaces";

interface PreviewExamBoxProps {
  previewExam: PreviewExam;
}

interface PreviewExamListProps {
  list: PreviewExam[];
}

const PreviewExamBox: React.FC<PreviewExamBoxProps> = (props) => {
  const { previewExam } = props;
  const { id, examContentPath, commentTotal, practiceTotal, title } =
    previewExam;

  return (
    <Link
      to={{
        pathname: "/test",
        search: `?id=${examContentPath}`,
      }}
      type="button"
      className="w-56 h-60 p-4 border border-solid border-slate-300 rounded-lg"
    >
      <h1 className="font-bold leading-5">{title}</h1>

      <div className="h-28 mt-2 font-semibold leading-tight">
        <div className="flex items-center text-gray-600 gap-1">
          <TimeIcon className="w-5 h-5" />
          <p className="text-sm font-semibold">120 phút</p>
        </div>

        <div className="flex items-center text-gray-600 gap-1">
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
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
            />
          </svg>
          {`${commentTotal} bình luận`}
        </div>

        <div className="flex items-center  text-gray-600 gap-1">
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
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <p>{`${practiceTotal} lượt thi`}</p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          type="button"
          className="text-blue-900 font-semibold text-base bg-white border-2 border-gray-300 focus:outline-none 
                  rounded-lg px-7 py-2.5 me-2 mb-2"
        >
          Làm bài
        </button>
      </div>
    </Link>
  );
};

const PreviewExamList: React.FC<PreviewExamListProps> = (props) => {
  const { list } = props;
  return (
    <div className="bg-white mt-10 px-6 py-4 rounded-md">
      <h3 className="font-bold text-2xl mb-4 text-blue-700">Đề thi mới nhất</h3>
      <div className="flex flex-wrap justify-between gap-6">
        {list.map((previewExam: PreviewExam, index) => {
          return <PreviewExamBox key={index} previewExam={previewExam} />;
        })}
      </div>
    </div>
  );
};

export default PreviewExamList;
