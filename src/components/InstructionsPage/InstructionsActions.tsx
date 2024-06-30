import { useState } from "react";
import {
  setCurrentAction,
  type ChefAction,
} from "../../state/chefActions/chefActionsSlice";
import { allPossibleChefActions } from "../../utils/data";
import { handleKeyDown } from "../../utils/helpers";
import ActionImage from "../ActionImage";
import { useDispatch } from "react-redux";

function InstructionsActions() {
  const dispatch = useDispatch();
  const [chosenAction, setChosenAction] = useState<ChefAction | null>(null);

  const handleChooseAction = (action: ChefAction) => {
    if (chosenAction?.actionName === action.actionName) {
      setChosenAction(null);
      dispatch(setCurrentAction(null));
    } else {
      setChosenAction(action);
      dispatch(setCurrentAction(action));
    }
  };

  return allPossibleChefActions.map((action: ChefAction, i) => (
    <div
      key={`${action.actionName}_${i}`}
      className={`mr-8 mb-4 hover:opacity-100 ${
        action.actionName === chosenAction?.actionName
          ? "opacity-100 border-selected"
          : "opacity-50"
      }`}
      onClick={() => handleChooseAction(action)}
      onKeyDown={handleKeyDown}
    >
      <ActionImage action={action} allowRemove={false} />
    </div>
  ));
}

export default InstructionsActions;
