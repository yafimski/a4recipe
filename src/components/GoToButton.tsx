import { useNavigate } from "react-router-dom";
import { handleKeyDown } from "../utils/helpers";

function GoToButton({ page, isNext }: { page: string; isNext: boolean }) {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate(page);
  };

  return (
    <div
      data-testid={isNext ? "next" : "back"}
      className={`absolute w-24 h-24 m-8 py-8 px-6 card-shadow text-white font-semibold text-lg tracking-wider rounded-full ${
        isNext
          ? "right-0 bg-green-500 hover:bg-green-400"
          : "left-0 bg-red-500 hover:bg-red-400"
      } `}
      onKeyDown={handleKeyDown}
      onClick={handleNext}
    >
      <button type="button">{isNext ? "NEXT" : "BACK"}</button>
    </div>
  );
}

export default GoToButton;
