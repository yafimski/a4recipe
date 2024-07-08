import type { RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { handleKeyDownPrevent } from "../../utils/helpers";
import IngredientImage from "../IngredientImage";
import type { IngredientItem } from "../../state/ingredientGroups/ingredientGroupsSlice";
import { updateAvailableItem } from "../../state/chefActions/chefActionsSlice";

function InstructionsItems() {
  const dispatch = useDispatch();
  const availableItems = useSelector((state: RootState) => state.actions.availableItems);

  const handleRemoveItem = (item: IngredientItem) => {
    dispatch(updateAvailableItem(item));
  };

  return availableItems.map((item, index) => (
    <div
      key={`${item.itemName}_shelf_${index}`}
      data-item-name={item.itemName}
      className="mb-1 pb-2 lg:pb-4 print-rounded opacity-100 hover:scale-105"
      onKeyDown={handleKeyDownPrevent}
    >
      <IngredientImage
        groupName={index.toString()}
        item={item}
        allowRemove={false}
        onRemove={() => handleRemoveItem(item)}
      />
    </div>
  ));
}

export default InstructionsItems;
