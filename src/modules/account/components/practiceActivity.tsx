import { secondsToTime } from "../../../util/date";
import { PART_TABS } from "../../practice/utils/config";

const PracticeActivity = () => {
  return (
    <div className="space-y-8 mt-8">
      <div>
        <h3 className="font-bold">Practice Set TOEIC 2022 Test 9</h3>
        <table
          className={`w-full text-sm text-left rtl:text-right text-gray-500`}
        >
          <thead className=" text-black bg-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Ngày làm
              </th>
              <th scope="col" className="px-6 py-3">
                Kết quả
              </th>
              <th scope="col" className="px-6 py-3">
                Thời gian làm bài
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
                19-01-2003
              </th>
              <td className="px-6 py-4">25/30</td>
              <td className="px-6 py-4">{secondsToTime(parseInt("12346"))}</td>
              <td className="px-6 py-4 flex gap-1">
                {["part1", "part2"]?.map((part) => (
                  <div className="w-12 h-5 flex items-center justify-center bg-orange-300 text-white text-sm rounded-md">
                    {PART_TABS[part]}
                  </div>
                ))}
              </td>
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
        <h3 className="font-bold">Practice Set TOEIC 2022 Test 9</h3>
        <table
          className={`w-full text-sm text-left rtl:text-right text-gray-500`}
        >
          <thead className=" text-black bg-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Ngày làm
              </th>
              <th scope="col" className="px-6 py-3">
                Kết quả
              </th>
              <th scope="col" className="px-6 py-3">
                Thời gian làm bài
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
                19-01-2003
              </th>
              <td className="px-6 py-4">25/30</td>
              <td className="px-6 py-4">{secondsToTime(parseInt("12346"))}</td>
              <td className="px-6 py-4 flex gap-1">
                {["part1", "part2"]?.map((part) => (
                  <div className="w-12 h-5 flex items-center justify-center bg-orange-300 text-white text-sm rounded-md">
                    {PART_TABS[part]}
                  </div>
                ))}
              </td>
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

export default PracticeActivity;
