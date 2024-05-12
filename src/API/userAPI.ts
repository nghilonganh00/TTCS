const UserAPI = {
  getById: async (): Promise<any> => {
    try {
      const userId = localStorage.getItem("userId");
      const url = `http://localhost:8080/api/users/${userId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
  upload: async (
    username: string,
    addressHome: string,
    addressWork: string,
    dob: string,
    phone: string,
    introduction: string,
    avatar: string | null
  ): Promise<any> => {
    try {
      const userId = localStorage.getItem("userId");

      const url = `http://localhost:8080/api/users/${userId}`;
      const requestData = {
        username,
        addressHome,
        addressWork,
        dob,
        phone,
        introduction,
        avatar,
      };

      const response = await fetch(url, {
        method: "PUT",
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
};

export default UserAPI;
