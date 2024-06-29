import type { RootState } from "../../state/store";
import { useSelector } from "react-redux";
import type {
  IngredientItem,
  ItemsGroup,
} from "../../state/ingredientGroups/ingredientGroupsSlice";
import IngredientImage from "../IngredientImage";
import { handleKeyDown } from "../../utils/helpers";
import { useState } from "react";

function InstructionsItems() {
  const [chosenItems, setChosenItems] = useState<IngredientItem[]>([]);

  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );

  const handleChooseItem = (item: IngredientItem) => {
    if (chosenItems.includes(item)) {
      setChosenItems(chosenItems.filter((prevItem) => prevItem !== item));
    } else {
      setChosenItems((prev) => [...prev, item]);
    }
  };

  return ingredientsGroups.map((group: ItemsGroup, i) => (
    <div key={`${group.groupName}_${i}`} className="ml-4 mb-12">
      {group.items.map((item) => (
        <div
          key={`${group.groupName}_${item.itemName}`}
          className={`mb-4 hover:opacity-100 ${
            chosenItems.includes(item) ? "opacity-100 border-selected" : "opacity-50"
          }`}
          onClick={() => handleChooseItem(item)}
          onKeyDown={handleKeyDown}
        >
          <IngredientImage
            groupName={group.groupName}
            itemName={item.itemName}
            allowRemove={false}
          />
        </div>
      ))}
    </div>
  ));
}

export default InstructionsItems;
