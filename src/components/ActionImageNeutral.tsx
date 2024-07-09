import type { ChefAction } from "../state/chefActions/chefActionsSlice";
import { srcPath } from "../utils/helpers";

interface IngredientProp {
  action: ChefAction;
}

function ActionImageNeutral({ action }: IngredientProp) {
  const { actionName } = action;

  return (
    <div key={actionName} className="bg-white card-shadow print-rounded w-clamp">
      <img
        draggable="false"
        src={`${srcPath}/assets/chefActions/${actionName}.webp`}
        alt={actionName}
        data-testid={`${actionName}_action`}
        className="print-rounded-img md:w-clampSmall lg:w-clamp"
      />
      <p className="md:text-sm text-fluidCard py-2">{actionName}</p>
    </div>
  );
}

export default ActionImageNeutral;
