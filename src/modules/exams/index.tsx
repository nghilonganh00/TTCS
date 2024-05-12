import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import TimeIcon from "../../global/icons/timeIcon";
import { useEffect, useState } from "react";
import ExamAPI from "../../API/ExamAPI";
import PreviewExamList from "../home/components/previewExamList";

const Exams = () => {
  const [previewExamList, setPreviewExamList] = useState<any>();
  useEffect(() => {
    const fetchPreviewExam = async () => {
      try {
        const previewExamsRes = await ExamAPI.getPreviewExam(
          "http://localhost:8080/api/exam/preview"
        );
        const previewExamData = Object.values(previewExamsRes);
        setPreviewExamList(() => previewExamData);
      } catch (error) {
        console.error("Error fetching preview exams:", error);
      }
    };
    fetchPreviewExam();
  }, []);
  console.log(previewExamList);
  return (
    <div className="py-8 bg-gray-50">
      <div className="container mx-auto space-y-4">
        <h2 className="font-bold text-3xl">Thư viện đề thi</h2>

        <div className="flex gap-2">
          <div className="w-12 h-7 bg-white text-center border border-solid border-gray-300 rounded-sm">
            <p>2023</p>
          </div>
        </div>

        <div className="w-2/3 relative">
          <input
            type="text"
            className="w-full border border-solid border-gray-400 rounded-sm px-2 py-1"
            placeholder="Nhập tên bài thi mà bạn muốn tìm kiếm"
          />
          <MagnifyingGlassIcon className="w-5 h-5 absolute top-1.5 right-2" />
        </div>

        <button
          type="button"
          className="text-white font-semibold text-base bg-blue-800 border-2 border-gray-300 focus:outline-none 
                    rounded-lg px-4 py-2 me-2 mb-2 hover:text-white hover:bg-blue-900"
        >
          Tìm kiếm
        </button>

        {/* <div className="flex flex-wrap justify-around gap-y-8"> */}
        <PreviewExamList list={previewExamList} />
        {/* </div> */}
      </div>
    </div>
  );
};
export default Exams;
