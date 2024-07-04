import { useEffect, useState } from "react";
import {
  setCurrentAction,
  updateInstructionAction,
  type ChefAction,
} from "../../state/chefActions/chefActionsSlice";
import { allPossibleChefActions } from "../../utils/data";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import ActionImageWithName from "../ActionImageWithName";
import { handleKeyDownPrevent } from "../../utils/helpers";

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

  return allPossibleChefActions.map((action: ChefAction) => (
    <div
      key={`${action.actionName}`}
      onClick={() => handleChooseAction(action)}
      onKeyDown={handleKeyDownPrevent}
      className="bg-white mx-2 min-h-36 aspect-video-thin rounded-2xl hover:scale-105"
    >
      <ActionImageWithName action={action} showName={true} />
    </div>
  ));
}

export default InstructionsActions;
