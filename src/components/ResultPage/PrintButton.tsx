import { handleKeyDown } from "../../utils/helpers";

function PrintButton() {
  return (
    <div
      data-testid={"print"}
      onKeyDown={handleKeyDown}
      onClick={() => console.log("here")}
    >
      <button
        className="w-24 h-24 m-8 py-8 px-6 card-shadow text-white font-semibold text-lg tracking-wider rounded-full
            right-0 bg-blue-500 hover:bg-blue-400"
        type="button"
      >
        Print!
      </button>
    </div>
  );
}

export default PrintButton;
