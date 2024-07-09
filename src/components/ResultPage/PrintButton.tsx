import { handleKeyDownPrevent } from "../../utils/helpers";

function PrintButton() {
  return (
    <div
      data-testid={"print"}
      onKeyDown={handleKeyDownPrevent}
      onClick={() => console.log("here")}
    >
      <button type="button" className="print-button">
        PRINT
        <br />
        THIS OUT !
      </button>
    </div>
  );
}

export default PrintButton;
