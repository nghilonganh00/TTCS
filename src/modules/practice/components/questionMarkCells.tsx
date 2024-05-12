import { PART_TABS } from "../utils/config";

interface QuestionMarkCellsProps {
  parts: string[];
  exam: any;
}

const QuestionMarkCell = ({ questionIdx }: { questionIdx: string }) => {
  const scrollToQuestion = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });

      element.style.border = "1px solid blue";

      setTimeout(() => {
        element.style.border = "none";
      }, 500);
    }
  };
  return (
    <div
      className="size-8 flex items-center justify-center border border-solid border-slate-700 rounded-md hover:bg-blue-700 hover:text-white cursor-pointer hover:border-0 "
      onClick={() => scrollToQuestion(`question-${questionIdx}`)}
      id={`markCell-${questionIdx}`}
    >
      <span className="text-sm font-semibold ">{questionIdx}</span>
    </div>
  );
};

const QuestionMarkCells: React.FC<QuestionMarkCellsProps> = (props) => {
  const { parts, exam } = props;
  return (
    <div className="text-left mt-4">
      {parts.map((part) => {
        return (
          <div className="mb-4">
            <p className="text-lg font-semibold">{PART_TABS[part]}</p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(exam.parts[part]).map((questionIdx: string, key) => (
                <QuestionMarkCell questionIdx={questionIdx} key={key} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionMarkCells;
