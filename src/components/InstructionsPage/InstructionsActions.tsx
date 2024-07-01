import { useEffect, useState } from "react";
import {
  setCurrentAction,
  updateInstructionAction,
  type ChefAction,
} from "../../state/chefActions/chefActionsSlice";
import { allPossibleChefActions } from "../../utils/data";
import { handleKeyDown } from "../../utils/helpers";
import ActionImage from "../ActionImage";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../state/store";

function InstructionsActions() {
  const dispatch = useDispatch();
  const currentAction = useSelector((state: RootState) => state.actions.currentAction);

  const currentInstruction = useSelector(
    (state: RootState) => state.actions.currentInstruction
  );

  const [chosenAction, setChosenAction] = useState<ChefAction | null>(null);

  const handleChooseAction = (action: ChefAction) => {
    if (chosenAction?.actionName === action.actionName) {
      setChosenAction(null);
      dispatch(setCurrentAction(null));
    } else {
      setChosenAction(action);
      dispatch(setCurrentAction(action));
    }

    if (currentInstruction) {
      dispatch(updateInstructionAction({ id: currentInstruction.id, action }));
      dispatch(setCurrentAction(action));
    }
  };

  useEffect(() => {
    setChosenAction(currentAction);
  }, [currentAction]);

  return allPossibleChefActions.map((action: ChefAction, i) => (
    <div
      key={`${action.actionName}_${i}`}
      className={`mr-6 mb-4 bg-white card-shadow rounded-2xl hover:opacity-100 ${
        action.actionName === chosenAction?.actionName
          ? "opacity-100 border-selected"
          : "opacity-70"
      }`}
      onClick={() => handleChooseAction(action)}
      onKeyDown={handleKeyDown}
    >
      <ActionImage action={action} allowRemove={false} />
      <p className="py-1">{action.actionName}</p>
    </div>
  ));
}

export default InstructionsActions;
