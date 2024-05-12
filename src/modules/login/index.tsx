import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import AuthAPI from "../../API/authAPI";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await AuthAPI.signIn(email, password);
    let data = await response.json();
    if (!response.ok) {
      setPassword("");
    } else {
      localStorage.setItem("userId", data.data.uid);
      navigate("/");
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center bg-white">
      <form action="">
        <div className="px-4 py-12 border border-solid border-slate-300 rounded-xl space-y-5">
          <h1 className="font-semibold text-3xl leading-5 pb-6 text-center">
            Đăng nhập
          </h1>

          <div className="space-y-2">
            <div>
              <label htmlFor="username" className="text-md  ">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-md p-2  bg-transparent"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="username" className="text-md ">
                Password
              </label>
              <input
                type="password"
                name="username"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-md p-2  bg-transparent"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="space-x-1">
              <input type="checkbox" />
              <label className="">Nhớ mật khẩu</label>
            </div>

            <button className="text-blue-700">Quên mật khẩu</button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={handleLogin}
              className="w-full text-white font-semibold text-base bg-blue-700 focus:outline-none 
                  rounded-lg px-7 py-2.5 me-2 mb-2"
            >
              Đăng nhập
            </button>
            <Link to={"/signup"} className="hover:text-blue-600">
              Đăng ký tài khoản
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
