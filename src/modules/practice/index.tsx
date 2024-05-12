import { useEffect, useState } from "react";
import { UserAnswers } from "../../global/interfaces/interfaces";
import PracticeContent from "./components/praticeContent";
import { useLocation } from "react-router-dom";
import ExamAPI from "../../API/ExamAPI";

const Practice = () => {
  const location = useLocation();
  const config = location.state.config;
  console.log("config: ", config);
  const [exam, setExam] = useState();
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});

  useEffect(() => {
    if (config?.examId) {
      const fetchExamById = async () => {
        try {
          const response = await ExamAPI.getById(config.examId);
          setExam(response.exam);
          console.log(response.exam);
        } catch (error) {
          console.error("Error fetching preview exams:", error);
        }
      };

      fetchExamById();
    }
  }, []);

  return (
    <div className="px-5 mt-5">
      {config && exam && (
        <PracticeContent
          examId={config.examId}
          exam={exam}
          config={config}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
        />
      )}
    </div>
  );
};

export default Practice;
