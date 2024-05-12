import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Profile from "./components/profile";
import { useEffect, useState } from "react";
import UserAPI from "../../API/userAPI";

const Account = () => {
  const [profile, setProfile] = useState<any>();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const date = await UserAPI.getById();
        setProfile(() => date);
      } catch (error) {
        console.error("Error fetching preview exams:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="bg-white w-full ">
      <div className="container mx-auto flex flex-col items-center py-5 space-y-2">
        <Profile />
        {/* <UserActivity /> */}

        <div className="w-1/2 space-y-6">
          <div className="border border-solid py-4 rounded-lg">
            <h3 className="font-semibold text-xl px-4">Thông tin cơ bản</h3>
            <div className="border-b py-4 hover:bg-gray-100 hover:cursor-pointer">
              <div className="flex items-center px-4">
                <h3 className="w-40 text-gray-600">Họ và tên</h3>
                <h3 className="flex-1 text-lg">{profile?.username}</h3>
                <ChevronRightIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="border-b py-4 hover:bg-gray-100 hover:cursor-pointer">
              <div className="flex items-center px-4">
                <h3 className="w-40 text-gray-600">Ngày sinh</h3>
                <h3 className="flex-1 text-lg">{profile?.dob}</h3>
                <ChevronRightIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="py-4 hover:bg-gray-100 hover:cursor-pointer">
              <div className="flex items-center px-4">
                <h3 className="w-40 text-gray-600">{profile?.gender}</h3>
                <h3 className="flex-1 text-lg">Nam</h3>
                <ChevronRightIcon className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="border border-solid py-4 rounded-lg">
            <h3 className="font-semibold text-xl px-4">Thông tin liên lạc</h3>
            <div className="border-b py-4 hover:bg-gray-100 hover:cursor-pointer">
              <div className="flex items-center px-4">
                <h3 className="w-40 text-gray-600">Email</h3>
                <h3 className="flex-1 text-lg">{profile?.email}</h3>
                <ChevronRightIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="border-b py-4 hover:bg-gray-100 hover:cursor-pointer">
              <div className="flex items-center px-4">
                <h3 className="w-40 text-gray-600">Số điện thoại</h3>
                <h3 className="flex-1 text-lg">{profile?.phone}</h3>
                <ChevronRightIcon className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="border border-solid py-4 rounded-lg">
            <h3 className="font-semibold text-xl px-4">Địa chỉ</h3>
            <div className="border-b py-4 hover:bg-gray-100 hover:cursor-pointer">
              <div className="flex items-center px-4">
                <h3 className="w-40 text-gray-600">Địa chỉ nhà</h3>
                <h3 className="flex-1 text-lg">{profile?.addressHome}</h3>
                <ChevronRightIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="border-b py-4 hover:bg-gray-100 hover:cursor-pointer">
              <div className="flex items-center px-4">
                <h3 className="w-40 text-gray-600">Địa chỉ làm việc</h3>
                <h3 className="flex-1 text-lg">{profile?.addressWork}</h3>
                <ChevronRightIcon className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="border border-solid py-4 rounded-lg">
            <h3 className="font-semibold text-xl px-4">Password</h3>
            <div className="border-b py-4 hover:bg-gray-100 hover:cursor-pointer">
              <div className="flex items-center px-4">
                <h3 className="w-40 text-gray-600">••••••••</h3>
                <div className="flex-1 ">
                  Lần thay đổi cuối cùng: {profile?.lastResetPassword}
                </div>
                <ChevronRightIcon className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
