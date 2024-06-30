import type { IngredientItem } from "../../state/ingredientGroups/ingredientGroupsSlice";
import IngredientImage from "../IngredientImage";
import { handleKeyDown } from "../../utils/helpers";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addToCurrentActionItems,
  removeFromCurrentActionItems,
} from "../../state/chefActions/chefActionsSlice";

interface InstructionsItemProps {
  groupName: string;
  item: IngredientItem;
}

function InstructionsItem({ groupName, item }: InstructionsItemProps) {
  const dispatch = useDispatch();
  const [isChosen, setIsChosen] = useState<boolean>(false);

  const handleChooseItem = () => {
    if (isChosen) {
      dispatch(removeFromCurrentActionItems(item));
    } else {
      dispatch(addToCurrentActionItems(item));
    }

    setIsChosen(!isChosen);
  };

  return (
    <div
      key={`${groupName}_${item.itemName}`}
      className={`hover:opacity-100 ${
        isChosen ? "opacity-100 border-selected" : "opacity-50"
      }`}
      onClick={() => handleChooseItem()}
      onKeyDown={handleKeyDown}
    >
      <IngredientImage
        groupName={groupName}
        itemName={item.itemName}
        allowRemove={false}
      />
    </div>
  );
}

export default InstructionsItem;
