const StatisticAPI = {
  get: async (timeFrame: number): Promise<any> => {
    try {
      const queryParams = new URLSearchParams({
        userId: localStorage.getItem("userId") || "",
        timeFrame: timeFrame.toString(),
      });

      const response = await fetch(
        `http://localhost:8080/api/statistic?${queryParams}`,
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

  getByPart: async (timeFrame: number, part: string) => {
    try {
      const queryParams = new URLSearchParams({
        userId: localStorage.getItem("userId") || "",
        timeFrame: timeFrame.toString(),
      });

      const response = await fetch(
        `http://localhost:8080/api/statistic/part/${part}?${queryParams}`,
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
        `http://localhost:8080/api/statistic/exam/${examId}`,
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

export default StatisticAPI;
