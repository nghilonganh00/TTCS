import ExamAPI from "../../API/ExamAPI";
import { useEffect, useState } from "react";
import PreviewExamList from "./components/previewExamList";
import { PreviewExam } from "../../global/interfaces/interfaces";
import ExamHistoryAPI from "../../API/ExamHistoryAPI";
import PreviewExamHistoryList from "./components/previewExamHistoryList";

const Home = () => {
  const [examHistoryPreview, setExamHistoryPreview] = useState<any[]>([]);
  const [previewExamList, setPreviewExamList] = useState<PreviewExam[]>([]);

  useEffect(() => {
    const fetchExamHistoryPreview = async () => {
      try {
        const data = await ExamHistoryAPI.getAllPreview();
        setExamHistoryPreview(data);
        console.log("exam history preview: ", data);
      } catch (error) {
        console.log("Error fetching preview exam history: ", error);
      }
    };

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
    fetchExamHistoryPreview();
    fetchPreviewExam();
  }, []);

  return (
    <div className="w-full pt-5 bg-gray-50">
      <div className="md:container mx-auto pb-5">
        <PreviewExamHistoryList list={examHistoryPreview} />

        <PreviewExamList list={previewExamList} />
      </div>
    </div>
  );
};

export default Home;
