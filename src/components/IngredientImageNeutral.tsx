import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IngredientItem } from "../state/ingredientGroups/ingredientGroupsSlice";

interface IngredientProp {
  groupName: string;
  item: IngredientItem;
  size?: "sm" | "lg";
  onRemoveItem: (item: IngredientItem) => void;
}

function IngredientImageNeutral({ groupName, item, onRemoveItem }: IngredientProp) {
  const handleRemoveItem = () => {
    onRemoveItem(item);
  };

  return (
    <div
      key={`${groupName}_${item.itemName}`}
      className="relative print-rounded aspect-square print-image card-shadow center"
    >
      <img
        draggable="false"
        src={`../src/assets/ingredients/${item.itemName.toLowerCase()}.webp`}
        alt={item.itemName}
        data-testid={`${groupName}_${item.itemName}_shelf`}
        className="print-rounded print-image"
      />
      <div className="flex center rounded-2xl">
        <FontAwesomeIcon
          icon={faClose}
          size="sm"
          onClick={handleRemoveItem}
          className="absolute pointer-events-auto top-0 right-0 -m-2 cursor-pointer text-white bg-black bg-opacity-80 rounded-full px-1 py-1"
        />
      </div>
    </div>
  );
}

export default IngredientImageNeutral;
