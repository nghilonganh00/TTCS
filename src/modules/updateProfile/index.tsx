import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserAPI from "../../API/userAPI";
import StorageAPI from "../../firebase/storageAPI";

const UpdateProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    username: "",
    dob: "",
    addressHome: "",
    addressWork: "",
    introduction: "",
    avatar: null,
    phone: "",
  });

  const handleOnChangeProfile = (name: string, newValue: string) => {
    setProfile((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleOnChangeFile = (name: string, newFiles: FileList | null) => {
    if (newFiles) {
      setProfile((prev) => ({
        ...prev,
        [name]: newFiles[0],
      }));
    }
  };

  const handleOnClickUpdate = async () => {
    const {
      username,
      dob,
      addressHome,
      addressWork,
      introduction,
      phone,
      avatar,
    } = profile;

    let avatarURL = null;
    if (avatar) {
      avatarURL = await StorageAPI.upload(avatar);
    }

    console.log("avatarURL: ", avatarURL);

    const updatedUser = await UserAPI.upload(
      username,
      addressHome,
      addressWork,
      dob,
      phone,
      introduction,
      avatarURL
    );

    console.log("updatedUser: ", updatedUser);

    // if (updatedUser) {
    //   navigate("/account");
    // }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchExamById = async () => {
      try {
        const data = await UserAPI.getById();
        setProfile((prev) => ({
          ...prev,
          ...data,
        }));
      } catch (error) {
        console.error("Error fetching preview exams:", error);
      }
    };

    fetchExamById();
  }, []);

  return (
    <div className="w-full py-8 bg-white">
      <form
        onSubmit={handleOnClickUpdate}
        className=" md:w-1/2 mx-auto border border-solid border-gray-300 rounded-lg p-4 space-y-6"
      >
        <h3 className="text-2xl font-bold">Cập nhật thông tin cá nhân</h3>

        <div className="mt-6 space-y-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-2">
              Họ và tên
            </label>
            <input
              type="text"
              id="username"
              placeholder="Họ và tên"
              name="username"
              value={profile.username}
              onChange={(e) =>
                handleOnChangeProfile(e.target.name, e.target.value)
              }
              className="p-2 border border-solid border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="dob" className="mb-2">
              Ngày sinh
            </label>
            <input
              type="text"
              id="dob"
              name="dob"
              value={profile.dob}
              onChange={(e) =>
                handleOnChangeProfile(e.target.name, e.target.value)
              }
              placeholder="Ngày sinh của bạn"
              className="p-2 border border-solid border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="addressHome" className="mb-2">
              Địa chỉ nhà
            </label>
            <input
              type="text"
              id="addressHome"
              name="addressHome"
              value={profile.addressHome}
              onChange={(e) =>
                handleOnChangeProfile(e.target.name, e.target.value)
              }
              placeholder="Địa chỉ hiện tại"
              className="p-2 border border-solid border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="addressWork" className="mb-2">
              Địa chỉ làm việc
            </label>
            <input
              type="text"
              id="addressWork"
              name="addressWork"
              value={profile.addressWork}
              onChange={(e) =>
                handleOnChangeProfile(e.target.name, e.target.value)
              }
              placeholder="Địa chỉ làm việc"
              className="p-2 border border-solid border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="addressWork" className="mb-2">
              Số điện thoại
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={profile.phone}
              onChange={(e) =>
                handleOnChangeProfile(e.target.name, e.target.value)
              }
              placeholder="Số điện thoại"
              className="p-2 border border-solid border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="addressWork" className="mb-2">
              Ảnh avatar
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={(e) =>
                handleOnChangeFile(e.target.name, e.target.files)
              }
              placeholder="Địa chỉ làm việc"
              className="p-2 border border-solid border-gray-300 rounded-md"
            />

            {profile.avatar && (
              <img
                src={URL.createObjectURL(profile.avatar)}
                alt="Avatar"
                className="w-56"
              />
            )}
          </div>
        </div>
      </form>
      <button
        type="submit"
        onClick={handleOnClickUpdate}
        className="text-white font-semibold text-base bg-blue-800 border-2 border-gray-300 focus:outline-none 
                    rounded-lg px-7 py-2.5 me-2 mb-2 hover:text-white hover:bg-blue-900"
      >
        Gửi
      </button>
    </div>
  );
};

export default UpdateProfile;
