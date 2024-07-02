import { handleKeyDownPrevent } from "../../utils/helpers";

function PrintButton() {
  return (
    <div
      data-testid={"print"}
      onKeyDown={handleKeyDownPrevent}
      onClick={() => console.log("here")}
    >
      <button
        type="button"
        className="my-8 sexy-button bg-blue-500 hover:bg-white hover:text-blue-500 focus:text-blue-500 focus:bg-gray-200 text-gray-50"
      >
        PRINT PAGE
      </button>
    </div>
  );
}

export default PrintButton;
