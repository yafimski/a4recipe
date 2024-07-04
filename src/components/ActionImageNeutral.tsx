import type { ChefAction } from "../state/chefActions/chefActionsSlice";

interface IngredientProp {
  action: ChefAction;
}

function ActionImageNeutral({ action }: IngredientProp) {
  const { actionName } = action;

  return (
    <div className="bg-white card-shadow rounded-2xl">
      <img
        draggable="false"
        src={`../src/assets/chefActions/${actionName.toLowerCase()}.webp`}
        alt={actionName}
        data-testid={`${actionName}_action`}
        className="rounded-t-2xl max-h-28"
      />
      <p className="text-base py-2">{actionName}</p>
    </div>
  );
}

export default ActionImageNeutral;
