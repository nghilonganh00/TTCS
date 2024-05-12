const CommentAPI = {
  add: async (examId: string, content: string): Promise<any> => {
    try {
      const requestData = {
        examId,
        userId: localStorage.getItem("userId"),
        content,
      };
      const url = "http://localhost:8080/api/comment/add";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default CommentAPI;
