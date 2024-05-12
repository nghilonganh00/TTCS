import { Link, useNavigate } from "react-router-dom";
import ConfirmPassword from "./components/ConfirmPasswordInput";
import { useState } from "react";
import AuthAPI from "../../API/authAPI";
// import { signUpAPI } from "../../API/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hanldeSignUp = async () => {
    const data = await AuthAPI.signUp(email, password);
    localStorage.setItem("userId", data.uid);
    navigate('/')
  };
  return (
    <div className="w-full h-full flex items-center justify-center bg-white">
      <form action="">
        <div className="px-4 py-12 border border-solid border-slate-300 rounded-xl space-y-5">
          <h1 className="font-semibold text-3xl leading-5 pb-6 text-center">
            Đăng ký tài khoản
          </h1>

          <div className="space-y-2">
            <div>
              <label htmlFor="username" className="text-md  ">
                Email
              </label>
              <input
                type="text"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-md p-2  bg-transparent"
                placeholder="Nhập email của bạn"
              />
            </div>

            <div>
              <label htmlFor="username" className="text-md ">
                Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-md p-2  bg-transparent"
                placeholder="Nhập mật khẩu"
              />
            </div>
            <ConfirmPassword />
          </div>

          <div className="text-center space-y-2">
            <button
              type="button"
              onClick={hanldeSignUp}
              className="w-full text-white font-semibold text-base bg-blue-700 focus:outline-none 
                  rounded-lg px-7 py-2.5 me-2 mb-2"
            >
              Đăng ký
            </button>
            <div className="flex items-center justify-center">
              <p>Bạn đã có tài khoản?</p>
              <Link to={"./login"} className="text-blue-600">
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
