import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TopNavbar from "./global/components/TopNavbar";
import Practice from "./modules/practice";
import Home from "./modules/home";
import Result from "./modules/result";
import Login from "./modules/login";
import Signup from "./modules/signup";
import Admin from "./modules/admin";
import Test from "./modules/test";
import Solution from "./modules/solution";
import { useEffect, useState } from "react";
import Account from "./modules/account";
import UpdateProfile from "./modules/updateProfile";
import Statistic from "./modules/statistic";
import Exams from "./modules/exams";
import AddQuestion from "./modules/addQuestion.tsx";

function App() {
  const [isShowTopNavbar, setShowTopNavbar] = useState(true);

  useEffect(() => {
    setShowTopNavbar(window.location.pathname.startsWith("admin/"));
  }, [window.location.pathname]);

  return (
    <BrowserRouter>
      <div
        className="h-screen"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "max-content 1fr",
          gridTemplateAreas: `
            "top-navbar"
            "main"
          `,
        }}
      >
        <div style={{ gridArea: "top-navbar" }}>
          {!isShowTopNavbar && <TopNavbar />}
        </div>
        <div className="overflow-auto" style={{ gridArea: "main" }}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/practice" element={<Practice />}></Route>
            <Route path="/result" element={<Result />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/exams" element={<Exams />}></Route>
            <Route path="/test" element={<Test />}></Route>
            <Route path="/solution" element={<Solution />}></Route>
            <Route path="/account" element={<Account />}></Route>
            <Route path="/account/update" element={<UpdateProfile />}></Route>
            <Route path="/statistic" element={<Statistic />}></Route>
            <Route path="/admin/exam/:id" element={<AddQuestion />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
