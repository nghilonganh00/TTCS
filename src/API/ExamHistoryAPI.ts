import { PreviewExam } from "../global/interfaces/interfaces";

const ExamHistoryAPI = {
  getAllPreview: async (examId?: string) => {
    const userId = localStorage.getItem("userId") || "";
    const queryParams = new URLSearchParams({
      examId: examId || "",
      userId: userId,
    });
    const url = `http://localhost:8080/api/examHistory/previews?${queryParams}`;
    try {
      const response = await fetch(url, {});
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: string): Promise<any> => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/examHistory/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  },

  getByExamId: async (examId: string): Promise<any> => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/examHistory/exam/${examId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  },
};

export default ExamHistoryAPI;
