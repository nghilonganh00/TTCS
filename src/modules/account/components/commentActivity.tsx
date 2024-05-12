import { secondsToTime } from "../../../util/date";
import { PART_TABS } from "../../practice/utils/config";

const CommentActivity = () => {
  return (
    <div className="space-y-8 mt-8">
      <div>
        <h3 className="font-bold">Thứ 5, ngày 18-4</h3>
        <table
          className={`w-full text-sm text-left rtl:text-right text-gray-500`}
        >
          <thead className=" text-black bg-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Bài thi
              </th>
              <th scope="col" className="px-6 py-3">
                Nội dung
              </th>
              <th scope="col" className="px-6 py-3">
                Thời gian
              </th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="text-gray-900 font-semibold">
            <tr className="even:bg-white odd:bg-gray-50 border-y border-gray-500">
              <th
                scope="row"
                className="px-6 py-4 font-medium  whitespace-nowrap"
              >
                Practice Set TOEIC 2022 Test 9
              </th>
              <td className="px-6 py-4">
                Practice Set TOEIC 2022 Test 9Practice Set TOEIC 2022 Test 9
              </td>
              <td className="px-6 py-4">19-02-2003</td>

              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Xem chi tiết
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="font-bold">Thứ 5, ngày 18-4</h3>
        <table
          className={`w-full text-sm text-left rtl:text-right text-gray-500`}
        >
          <thead className=" text-black bg-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Bài thi
              </th>
              <th scope="col" className="px-6 py-3">
                Nội dung
              </th>
              <th scope="col" className="px-6 py-3">
                Thời gian
              </th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="text-gray-900 font-semibold">
            <tr className="even:bg-white odd:bg-gray-50 border-y border-gray-500">
              <th
                scope="row"
                className="px-6 py-4 font-medium  whitespace-nowrap"
              >
                Practice Set TOEIC 2022 Test 9
              </th>
              <td className="px-6 py-4">
                Practice Set TOEIC 2022 Test 9Practice Set TOEIC 2022 Test 9
              </td>
              <td className="px-6 py-4">19-02-2003</td>

              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Xem chi tiết
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommentActivity;
