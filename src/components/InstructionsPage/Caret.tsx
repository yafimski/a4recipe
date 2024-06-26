import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleKeyDown } from "../../utils/helpers";

interface CaretProps {
  icon: IconDefinition;
  onCaretClick: () => void;
}

function Caret({ icon, onCaretClick }: CaretProps) {
  return (
    <div
      className="flex center short-height cursor-pointer hover:border-y-2 hover:border-black"
      onClick={() => onCaretClick()}
      onKeyDown={handleKeyDown}
    >
      <FontAwesomeIcon icon={icon} size="lg" />
    </div>
  );
}

export default Caret;
