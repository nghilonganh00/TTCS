import { idText } from "typescript";
import { PreviewExam } from "../global/interfaces/interfaces";

const ExamAPI = {
  getPreviewExam: async (url: string): Promise<PreviewExam[]> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error; // Re-throw the error to handle it in the component
    }
  },

  getById: async (id: string): Promise<any> => {
    try {
      const userId = localStorage.getItem("userId");
      const queryParams = new URLSearchParams({
        examId: id,
        userId: userId || "",
      });

      const response = await fetch(
        `http://localhost:8080/api/exam/getById?${queryParams}`,
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

  add: async (examTitle: string, examYear: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/exam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          examTitle: examTitle,
          examYear: examYear,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  },

  edit: async (examId: string, examTitle: string, examYear: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/exam`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          examId: examId,
          examTitle: examTitle,
          examYear: examYear,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (examId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/exam`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          examId: examId,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  },

  grade: async (
    examId: string,
    userAnswers: {},
    parts: [],
    spentTime: number
  ): Promise<any> => {
    try {
      const requestData = {
        examId: examId,
        userId: localStorage.getItem("userId"),
        parts: parts,
        spentTime: spentTime,
        userAnswers: userAnswers,
      };

      const response = await fetch("http://localhost:8080/api/exam/grade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  },

  getQuestionById: async (set: string, part: string, question_id: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/exam/${set}/part/${part}/question_id/${question_id}`,
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

export default ExamAPI;
