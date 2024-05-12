const AuthAPI = {
  signIn: async (email: string, password: string): Promise<any> => {
    try {
      const requestData = { email, password };
      const url = "http://localhost:8080/api/auth/sign-in";

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

  signUp: async (email: string, password: string) => {
    try {
      const requestData = { email, password };
      const url = "http://localhost:8080/api/auth/sign-up";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      const responseData = await response.json();
      return responseData.data;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthAPI;
