import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        className="h-24 w-24 rounded-full"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />

      <div className="flex items-center gap-3">
        <h3 className="font-semibold text-xl">thienlove6d</h3>
        <Link to={'./update'} className="flex items-center gap-1 text-blue-600 hover:underline hover:cursor-pointer">
          <h3 className="">Chỉnh sửa</h3>
          <PencilSquareIcon className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default Profile;
