import type { ChefAction } from "../state/chefActions/chefActionsSlice";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { srcPath } from "../utils/helpers";

interface IngredientProp {
  action: ChefAction;
}

function ActionImageWithName({ action }: IngredientProp) {
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
      <div key={actionName} className="bg-white card-shadow print-rounded w-clamp">
        <img
          draggable="false"
          src={`${srcPath}/assets/chefActions/${actionName}.webp`}
          alt={actionName}
          data-testid={`${actionName}_action`}
          className="print-rounded-img rounded-t-lg w-clamp"
        />
        <p className="text-fluidPrint py-2">{actionName}</p>
      </div>
    </div>
  );
}

export default ActionImageWithName;
