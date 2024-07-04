import type { ChefAction } from "../../state/chefActions/chefActionsSlice";
import { allPossibleChefActions } from "../../utils/data";
import ActionImageWithName from "../ActionImageWithName";

function InstructionsActions() {
  return allPossibleChefActions.map((action: ChefAction) => (
    <div
      key={`${action.actionName}`}
      className="bg-white mx-2 min-h-36 aspect-video-thin rounded-2xl hover:scale-105"
    >
      <ActionImageWithName action={action} showName={true} />
    </div>
  ));
}

export default InstructionsActions;
