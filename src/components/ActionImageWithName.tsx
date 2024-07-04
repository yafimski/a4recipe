import type { ChefAction } from "../state/chefActions/chefActionsSlice";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

interface IngredientProp {
  action: ChefAction;
  showName: boolean;
}

function ActionImageWithName({ action, showName }: IngredientProp) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: action.actionName,
    data: {
      type: "Action",
      action,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const { actionName } = action;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div key={actionName} className="bg-white card-shadow rounded-2xl">
        <img
          draggable="false"
          src={`../src/assets/chefActions/${actionName.toLowerCase()}.webp`}
          alt={actionName}
          data-testid={`${actionName}_action`}
          className="rounded-t-2xl max-h-28"
        />
        {showName && <p className="text-base py-2">{actionName}</p>}
      </div>
    </div>
  );
}

export default ActionImageWithName;
