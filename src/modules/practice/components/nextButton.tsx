interface NextButtonProps {
  onClick: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick }) => {
  return (
    <div className="text-right" onClick={onClick}>
      <span className="font-semibold text-blue-600 hover:underline hover:cursor-pointer">
        Tiếp theo
      </span>
    </div>
  );
};

export default NextButton;
