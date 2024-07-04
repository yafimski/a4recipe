import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import type { IngredientItem } from "../state/ingredientGroups/ingredientGroupsSlice";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

interface IngredientProp {
  groupName: string;
  item: IngredientItem;
  allowRemove: boolean;
  onRemove?: () => void;
  size?: "sm" | "lg";
}

function IngredientImage({
  groupName,
  item,
  allowRemove,
  onRemove,
  size = "lg",
}: IngredientProp) {
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
      className={`relative rounded-2xl aspect-square ${
        size === "lg" ? "large-image" : "small-image"
      } card-shadow center`}
      style={style}
      {...listeners}
      {...attributes}
    >
      <img
        src={`../src/assets/ingredients/${item.itemName.toLowerCase()}.webp`}
        alt={item.itemName}
        data-testid={`${groupName}_${item.itemName}_selected`}
        className="rounded-2xl"
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
