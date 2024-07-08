import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import type { IngredientItem } from "../state/ingredientGroups/ingredientGroupsSlice";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { srcPath } from "../utils/helpers";

interface IngredientProp {
  groupName: string;
  item: IngredientItem;
  allowRemove: boolean;
  onRemove?: () => void;
  size?: "sm" | "lg";
}

function IngredientImage({ groupName, item, allowRemove, onRemove }: IngredientProp) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: `${groupName}_${item.itemName}`,
    data: {
      type: "Ingredient",
      item,
      parentGroup: groupName,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      key={`${groupName}_${item.itemName}`}
      className="relative print-rounded aspect-square w-clamp card-shadow center"
      style={style}
      {...listeners}
      {...attributes}
    >
      <img
        src={`${srcPath}/assets/ingredients/${item.itemName.toLowerCase()}.webp`}
        alt={item.itemName}
        data-testid={`${groupName}_${item.itemName}_selected`}
        className="print-rounded"
      />
      {allowRemove && (
        <div className="flex center rounded-2xl">
          <FontAwesomeIcon
            icon={faClose}
            size="sm"
            onClick={() => onRemove?.()}
            className="absolute pointer-events-auto top-0 right-0 -m-2 cursor-pointer text-white bg-black bg-opacity-80 rounded-full px-1 py-1"
          />
        </div>
      )}
    </div>
  );
}

export default IngredientImage;
