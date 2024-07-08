import { Suspense } from "react";
import type { ChefAction } from "../../state/chefActions/chefActionsSlice";
import { allPossibleChefActions } from "../../utils/data";
import ActionImageWithName from "../ActionImageWithName";

function InstructionsActions() {
  return allPossibleChefActions.map((action: ChefAction) => (
    <Suspense
      key={`${action.actionName}_suspense`}
      fallback={
        <div
          className="suspense-gallery-action"
          data-testid={`${action.actionName}_suspense`}
        >
          {""}
        </div>
      }
    >
      <div className="bg-white mx-2 aspect-videoThin hover:scale-105">
        <ActionImageWithName action={action} />
      </div>
    </Suspense>
  ));
}

export default InstructionsActions;
