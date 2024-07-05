import type { ChefAction } from "../state/chefActions/chefActionsSlice";

interface IngredientProp {
  action: ChefAction;
}

function ActionImageNeutral({ action }: IngredientProp) {
  const { actionName } = action;

  return (
    <div className="rounded-2xl h-36 card-shadow bg-white aspect-video-thin">
      <img
        draggable="false"
        src={`../src/assets/chefActions/${actionName.toLowerCase()}.webp`}
        alt={actionName}
        data-testid={`${actionName}_action`}
        className="rounded-t-2xl"
      />
      <p className="text-md py-2">{actionName}</p>
    </div>
  );
}

export default ActionImageNeutral;
