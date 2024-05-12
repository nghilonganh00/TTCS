import ReactPlayer from "react-player/lazy";

interface QuestionBoxProps {
  part: string;
  questionIdx: string;
  topic: string;
  answers: {
    [key: string]: string;
  };
  audio: string;
  image: string;
  handleSaveAnswer: (
    part: string,
    questionNumber: string,
    answer: string
  ) => void;
}

interface QuestionBoxsProps {
  part: string;
  listQuestion: any;
  handleSaveAnswer: (
    part: string,
    questionNumber: string,
    answer: string
  ) => void;
}

const QuestionBox: React.FC<QuestionBoxProps> = (props) => {
  const { part, questionIdx, topic, answers, audio, image, handleSaveAnswer } =
    props;

  const handleMarkQuestionAsDone = () => {
    const markCellElement = document.getElementById(`markCell-${questionIdx}`);

    const hasBlueBackground =
      markCellElement?.classList.contains("bg-blue-700");
    const hasWhiteText = markCellElement?.classList.contains("text-white");

    if (!hasBlueBackground) {
      markCellElement?.classList.add("bg-blue-700");
    }
    if (!hasWhiteText) {
      markCellElement?.classList.add("text-white");
    }
  };

  const handleSelectAnswer = (answer: string) => {
    handleMarkQuestionAsDone();
    handleSaveAnswer(part, questionIdx, answer);
  };

  return (
    <div>
      {audio !== "" && (
        <ReactPlayer
          url={audio}
          width="400px"
          height="50px"
          playing={false}
          controls={true}
        />
      )}
      <img src={image} alt="" className="max-w-2xl" />
      <div className="flex gap-2 py-3" id={`question-${questionIdx}`}>
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-200 ">
          <p className="font-semibold text-blue-800">{questionIdx}</p>
        </div>
        <div>
          <p>{topic}</p>
          <div className="mt-1">
            {Object.keys(answers).map((answerKey: string) => {
              const answer = answers[answerKey];
              return (
                <div
                  className="flex gap-1 items-center text-left"
                  key={questionIdx + answerKey}
                >
                  <input
                    type="radio"
                    name={"question-" + questionIdx}
                    value={answerKey}
                    onChange={() => handleSelectAnswer(answerKey)}
                  />
                  <label>{`${answerKey}. ${answer}`}</label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const QuestionBoxs: React.FC<QuestionBoxsProps> = ({
  part,
  listQuestion,
  handleSaveAnswer,
}) => {
  return (
    <div className="mt-4">
      {Object.keys(listQuestion).map((questionIdx: string, key) => {
        const { topic, answers, audio, image } = listQuestion[questionIdx];
        return (
          <QuestionBox
            part={part}
            questionIdx={questionIdx}
            topic={topic}
            audio={audio}
            image={image}
            answers={answers}
            key={key}
            handleSaveAnswer={handleSaveAnswer}
          />
        );
      })}
    </div>
  );
};

export default QuestionBoxs;
