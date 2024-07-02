import type { RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import type { IngredientItem } from "../../state/ingredientGroups/ingredientGroupsSlice";
import { handleKeyDownPrevent } from "../../utils/helpers";
import IngredientImage from "../IngredientImage";
import { useEffect, useState } from "react";
import {
  removeFromCurrentActionItems,
  addToCurrentActionItems,
  updateChefInstructionItems,
} from "../../state/chefActions/chefActionsSlice";
import { isEqual } from "lodash";

function InstructionsItems() {
  const dispatch = useDispatch();
  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );
  const currentItems = useSelector((state: RootState) => state.actions.currentItems);

  const currentInstruction = useSelector(
    (state: RootState) => state.actions.currentInstruction
  );

  const [chosenItems, setChosenItems] = useState<string[]>([]);

  const updateChosenInstructionItems = (item: IngredientItem, add: boolean) => {
    if (currentInstruction) {
      if (add) {
        dispatch(
          updateChefInstructionItems({
            id: currentInstruction.id,
            items: [...currentItems, item],
          })
        );
      } else {
        dispatch(
          updateChefInstructionItems({
            id: currentInstruction.id,
            items: currentItems.filter((currItem) => !isEqual(currItem, item)),
          })
        );
      }
    }
  };

  const handleChooseItem = (item: IngredientItem) => {
    if (chosenItems.includes(item.itemName)) {
      setChosenItems(chosenItems.filter((currName) => currName !== item.itemName));
      dispatch(removeFromCurrentActionItems(item));
      updateChosenInstructionItems(item, false);
    } else {
      setChosenItems((prev) => [...prev, item.itemName]);
      dispatch(addToCurrentActionItems(item));
      updateChosenInstructionItems(item, true);
    }
  };

  useEffect(() => {
    setChosenItems(currentItems.map((item) => item.itemName));
  }, [currentItems]);

  const allItems = ingredientsGroups.flatMap((group) => group.items);

  return allItems.map((item) => (
    <div key={item.itemName} onKeyDown={handleKeyDownPrevent} className="py-2">
      <div
        data-item-name={item.itemName}
        className={`hover:opacity-100 ${
          chosenItems.includes(item.itemName)
            ? "opacity-100 border-selected"
            : "opacity-50"
        }`}
        onClick={() => handleChooseItem(item)}
        onKeyDown={handleKeyDownPrevent}
      >
        <IngredientImage
          groupName={""}
          itemName={item.itemName}
          allowRemove={false}
          size={"sm"}
        />
      </div>
    </div>
  ));
}

export default InstructionsItems;
