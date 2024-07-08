import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleKeyDownPrevent } from "../../utils/helpers";

interface CaretProps {
  icon: IconDefinition;
  onCaretClick: () => void;
}

function Caret({ icon, onCaretClick }: CaretProps) {
  return (
    <div
      className="flex center max-h-short cursor-pointer hover:border-y-2 hover:border-black"
      onClick={() => onCaretClick()}
      onKeyDown={handleKeyDownPrevent}
    >
      <FontAwesomeIcon icon={icon} size="lg" />
    </div>
  );
}

export default Caret;
