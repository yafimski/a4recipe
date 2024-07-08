import type { ChefAction } from "../../state/chefActions/chefActionsSlice";
import { allPossibleChefActions } from "../../utils/data";
import ActionImageWithName from "../ActionImageWithName";

function InstructionsActions() {
  return allPossibleChefActions.map((action: ChefAction) => (
    <div
      key={`${action.actionName}`}
      className="bg-white mx-2 aspect-videoThin hover:scale-105"
    >
      <ActionImageWithName action={action} />
    </div>
  ));
}

export default InstructionsActions;
