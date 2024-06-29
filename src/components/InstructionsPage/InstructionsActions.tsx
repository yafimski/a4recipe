import { useState } from "react";
import type { ChefAction } from "../../state/chefActions/chefActionsSlice";
import { allPossibleChefActions } from "../../utils/data";
import { handleKeyDown } from "../../utils/helpers";
import ActionImage from "../ActionImage";

function InstructionsActions() {
  const [chosenAction, setChosenAction] = useState<ChefAction | null>(null);

  const handleChooseAction = (action: ChefAction) => {
    setChosenAction(action);
  };

  return allPossibleChefActions.map((action: ChefAction, i) => (
    <div key={`${action.actionName}_${i}`} className="mx-4">
      <div
        className={`mb-4 hover:opacity-100 ${
          chosenAction?.actionName === action.actionName
            ? "opacity-100 border-selected"
            : "opacity-50"
        }`}
        onClick={() => handleChooseAction(action)}
        onKeyDown={handleKeyDown}
      >
        <ActionImage action={action} allowRemove={false} />
      </div>
    </div>
  ));
}

export default InstructionsActions;
