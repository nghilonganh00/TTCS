import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../../../global/components/Popup";
import ExamAPI from "../../../API/ExamAPI";

const ExamManage = () => {
  const navigate = useNavigate();
  const navigateAddQuestionPage = (id: string) => {
    console.log("exam: ", id);
    navigate(`/admin/exam/${id}`);
  };

  const [showAddPopup, setShowAddPopup] = useState<boolean>(false);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);

  const [previewExamList, setPreviewExamList] = useState<any[]>();

  const [newExam, setNewExam] = useState<any>({
    examTitle: "",
    examYear: "",
  });
  const [editExam, setEditExam] = useState<any>({
    examId: "",
    examTitle: "",
    examYear: "",
  });

  const onChangeValue = (name: string, newValue: string) => {
    setNewExam((preExam: any) => ({
      ...preExam,
      [name]: newValue,
    }));
  };

  const onChangeEditValue = (name: string, newValue: string) => {
    setEditExam((preExam: any) => ({
      ...preExam,
      [name]: newValue,
    }));
  };

  const fetchPreviewExam = async () => {
    try {
      const previewExamsRes = await ExamAPI.getPreviewExam(
        "http://localhost:8080/api/exam/preview"
      );
      const previewExamData = Object.values(previewExamsRes);
      console.log(previewExamData);
      setPreviewExamList(() => previewExamData);
    } catch (error) {
      console.error("Error fetching preview exams:", error);
    }
  };

  const toggleAddPopup = () => {
    setShowAddPopup(!showAddPopup);
  };

  const toggleEditPopup = () => {
    setShowEditPopup(!showEditPopup);
  };

  const onClickEditExam = (examId: string) => {
    console.log("exam id: ", examId);
    const exam = previewExamList?.find((e) => e.id === examId);
    console.log("exam: ", exam);
    setEditExam((pre: any) => ({
      ...pre,
      examId: examId,
      examTitle: exam.title,
      examYear: exam.year,
    }));
    toggleEditPopup();
  };

  const handleAddNewExam = async () => {
    const { examTitle, examYear } = newExam;
    await ExamAPI.add(examTitle, examYear);
    toggleAddPopup();
  };

  const handleEditExam = async () => {
    const { examId, examTitle, examYear } = editExam;
    await ExamAPI.edit(examId, examTitle, examYear);
    toggleEditPopup();
  };

  const handleDeleteExam = async (examId: string) => {
    await ExamAPI.delete(examId);

    setPreviewExamList((e) =>
      previewExamList?.filter((pre) => pre.id !== examId)
    );
  };

  useEffect(() => {
    fetchPreviewExam();
  }, []);

  console.log("edit exam: ", editExam);

  return (
    <div className="ml-48 p-10">
      {showAddPopup && (
        <Popup onClose={toggleAddPopup}>
          <form className="max-w-sm mx-auto">
            <h3 className="text-lg">Thêm bài thi</h3>
            <div className="mb-5 w-80">
              <label
                htmlFor="examTitle"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Tên bài thi
              </label>
              <input
                type="text"
                id="email"
                name="examTitle"
                value={newExam.examTitle}
                onChange={(e) => onChangeValue(e.target.name, e.target.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Tên bài thi"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="text"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Năm
              </label>
              <input
                type="text"
                id="examYear"
                name="examYear"
                value={newExam.examYear}
                onChange={(e) => onChangeValue(e.target.name, e.target.value)}
                placeholder="Năm"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
            </div>

            <button
              type="submit"
              onClick={handleAddNewExam}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Thêm bài thi
            </button>
          </form>
        </Popup>
      )}

      {showEditPopup && (
        <Popup onClose={toggleEditPopup}>
          <form className="max-w-sm mx-auto">
            <h3 className="text-lg">Sửa bài thi</h3>
            <div className="mb-5 w-80">
              <label
                htmlFor="examTitle"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Tên bài thi
              </label>
              <input
                type="text"
                id="email"
                name="examTitle"
                value={editExam.examTitle}
                onChange={(e) =>
                  onChangeEditValue(e.target.name, e.target.value)
                }
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Tên bài thi"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="text"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Năm
              </label>
              <input
                type="text"
                id="examYear"
                name="examYear"
                value={editExam.examYear}
                onChange={(e) =>
                  onChangeEditValue(e.target.name, e.target.value)
                }
                placeholder="Năm"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
            </div>

            <button
              type="submit"
              onClick={handleEditExam}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Lưu
            </button>
          </form>
        </Popup>
      )}

      <button
        className="p-2 text-white bg-blue-800 mb-4"
        // onClick={navigateAddQuestionPage}
        onClick={toggleAddPopup}
      >
        Thêm bài thi
      </button>
      <table className="shadow-lg bg-white border-collapse">
        <tr className="hover:cursor-pointer hover:bg-gray-50 focus:bg-gray-300 active:bg-gray-200 font-semibold">
          <td className="border px-8 py-4">STT</td>
          <td className="border px-8 py-4">Tên bài thi</td>
          <td className="border px-8 py-4">Năm</td>
          <td className="border px-8 py-4">Số lượt thi</td>
          <td className="border px-8 py-4">Số lượt bình luận</td>
          <td className="border px-8 py-4">Hành động</td>
        </tr>
        {previewExamList?.map((exam: any, key) => {
          const { id, title, commentTotal, practiceTotal, year } = exam;
          return (
            <tr className="hover:cursor-pointer hover:bg-gray-50 focus:bg-gray-300 active:bg-gray-200">
              <td
                className="border px-8 py-4"
                onClick={() => navigateAddQuestionPage(id)}
              >
                {key}
              </td>
              <td className="border px-8 py-4">{title}</td>
              <td className="border px-8 py-4">{year}</td>
              <td className="border px-8 py-4">{practiceTotal}</td>
              <td className="border px-8 py-4">{commentTotal}</td>
              <td className="border px-8 py-4 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onClickEditExam(id)}
                  className=" font-semibold text-base focus:outline-none 
                     px-3 py-1 me-2 mb-2 text-white bg-green-700"
                >
                  Sửa
                </button>
                <button
                  type="submit"
                  onClick={() => handleDeleteExam(id)}
                  className=" font-semibold text-base focus:outline-none 
                     px-3 py-1 me-2 mb-2 text-white bg-red-700"
                >
                  Xóa
                </button>
              </td>
            </tr>
          );
        })}
      </table>
      {/* <button
        className="p-2 text-white bg-blue-800 mb-4"
        // onClick={navigateAddQuestionPage}
        onClick={togglePopup}
      >
        Thêm người dùng
      </button> */}
      {/* <table className="shadow-lg bg-white border-collapse">
        <tr className="hover:cursor-pointer hover:bg-gray-50 focus:bg-gray-300 active:bg-gray-200 font-semibold">
          <td className="border px-8 py-4">STT</td>
          <td className="border px-8 py-4">Người dùng báo lỗi</td>
          <td className="border px-8 py-4">Tên bài thi</td>
          <td className="border px-8 py-4">Câu hỏi</td>
          <td className="border px-8 py-4">Mô tả</td>
          <td className="border px-8 py-4">Ngày tạo</td>
        </tr>
        <tr>
          <td className="border px-8 py-4">1</td>
          <td className="border px-8 py-4">levanthien@gmail.com</td>
          <td className="border px-8 py-4">Pratice Set 2023 TOEIC Test1</td>
          <td className="border px-8 py-4">1</td>
          <td className="border px-8 py-4">Câu này phải là đáp án A</td>
          <td className="border px-8 py-4 flex items-center gap-1">
            11-05-2024
          </td>
        </tr>

        {previewExamList?.map((exam: any) => {
          const { id, title, commentTotal, practiceTotal, year } = exam;
          return (
            <tr
              onClick={() => navigateAddQuestionPage(id)}
              className="hover:cursor-pointer hover:bg-gray-50 focus:bg-gray-300 active:bg-gray-200"
            >
              <td className="border px-8 py-4">{id}</td>
              <td className="border px-8 py-4">{title}</td>
              <td className="border px-8 py-4">{year}</td>
              <td className="border px-8 py-4">{practiceTotal}</td>
              <td className="border px-8 py-4">{commentTotal}</td>
              <td className="border px-8 py-4 flex items-center gap-1">
                <button
                  type="button"
                  className=" font-semibold text-base focus:outline-none 
                     px-3 py-1 me-2 mb-2 text-white bg-green-700"
                >
                  Sửa
                </button>
                <button
                  type="button"
                  className=" font-semibold text-base focus:outline-none 
                     px-3 py-1 me-2 mb-2 text-white bg-red-700"
                >
                  Xóa
                </button>
              </td>
            </tr>
          );
        })}
      </table> */}
    </div>
  );
};

export default ExamManage;
