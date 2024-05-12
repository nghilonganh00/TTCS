interface SubmitButtonProps {
  onClick: () => void;
}
const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick }) => {
  return (
    <div className="w-full mt-5 flex items-center justify-center">
      <button
        onClick={onClick}
        type="button"
        className="text-blue-900 font-semibold text-base bg-white border-2 border-gray-300 focus:outline-none 
                    rounded-lg px-7 py-2.5 me-2 mb-2 hover:text-white hover:bg-blue-800"
      >
        Nộp bài
      </button>
    </div>
  );
};

export default SubmitButton;
