import { handleKeyDownPrevent } from "../../utils/helpers";

function PrintButton() {
  return (
    <div
      data-testid={"print"}
      onKeyDown={handleKeyDownPrevent}
      onClick={() => console.log("here")}
    >
      <button type="button" className="print-to-a4-button">
        PRINT
        <br />
        TO A4
      </button>
    </div>
  );
}

export default PrintButton;
