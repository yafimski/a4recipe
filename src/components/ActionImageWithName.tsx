import type { ChefAction } from "../state/chefActions/chefActionsSlice";
import { handleKeyDownPrevent } from "../utils/helpers";
import ActionImage from "./ActionImage";

interface IngredientProp {
  action: ChefAction;
  chosenAction: ChefAction | null;
  allowRemove: boolean;
  onClickAction: (e: React.MouseEvent, action: ChefAction) => void;
}

function ActionImageWithName({
  action,
  chosenAction,
  allowRemove,
  onClickAction,
}: IngredientProp) {
  return (
    <div
      data-action-name={action.actionName}
      className={`mx-2 card-shadow rounded-2xl hover:opacity-100 hover:scale-110 ${
        action.actionName === chosenAction?.actionName
          ? "opacity-100 border-selected -translate-y-4 card-shadow-strong"
          : "opacity-60"
      }`}
      onClick={(e) => onClickAction(e, action)}
      onKeyDown={handleKeyDownPrevent}
    >
      <ActionImage action={action} allowRemove={allowRemove} />
      <p className="py-1">{action.actionName}</p>
    </div>
  );
}

export default ActionImageWithName;
