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

function InstructionsActions() {
  const dispatch = useDispatch();
  const currentAction = useSelector((state: RootState) => state.actions.currentAction);

  const currentInstruction = useSelector(
    (state: RootState) => state.actions.currentInstruction
  );

  const [chosenAction, setChosenAction] = useState<ChefAction | null>(null);

  const handleChooseAction = (_e: React.MouseEvent, action: ChefAction) => {
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
    <ActionImageWithName
      key={`${action.actionName}`}
      action={action}
      chosenAction={chosenAction}
      allowRemove={false}
      onClickAction={(e, action) => handleChooseAction(e, action)}
    />
  ));
}

export default InstructionsActions;
