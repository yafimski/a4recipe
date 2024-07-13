import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import {
  type ItemsGroup,
  addItemToIngredientGroup,
} from "../../state/ingredientGroups/ingredientGroupsSlice";
import { setWarning } from "../../state/warning/warningSlice";
import type { RootState } from "../../state/store";
import { handleKeyDownPrevent, srcPath } from "../../utils/helpers";
import { useRef, useState } from "react";

function CustomIngredient() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [customName, setCustomName] = useState<string>("");

  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );

  const currentGroupName = useSelector(
    (state: RootState) => state.recipe.currentGroupName
  );

  const dispatch = useDispatch();

  const handleAddItemFromIngredients = () => {
    const groupName = currentGroupName || "All";

    const itemExists = ingredientsGroups
      .filter((group: ItemsGroup) => group.groupName === groupName)[0]
      ?.items.filter((item) => item.itemName === customName)[0];

    if (itemExists) {
      dispatch(setWarning("Ingredient is already in the group!"));
    } else {
      dispatch(addItemToIngredientGroup({ groupName, itemName: customName }));
    }
  };

  const handleNoteText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomName(e.target.value);
  };

  return (
    <div className="flex flex-col center mb-2" data-testid="custom_item_gallery">
      <p className="mb-2">
        Nothing found..
        <br />
        Add your own?
      </p>
      <img
        src={`${srcPath}/assets/ingredients/chefhat.webp`}
        alt={"chefHat"}
        className="print-rounded max-w-24 mb-4"
      />
      <div className="flex flex-col">
        <input
          type="text"
          ref={inputRef}
          className="input-border w-full text-fluidSubtitle text-center text-ellipsis whitespace-nowrap overflow-hidden sm:p-0 md:p-1 mb-4"
          placeholder="Custom Ingredient"
          value={customName}
          onChange={handleNoteText}
        />
        <div
          className="flex center print-rounded hover:cursor-pointer transition-opacity"
          onClick={() => handleAddItemFromIngredients()}
          onKeyDown={handleKeyDownPrevent}
        >
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="cursor-pointer text-2xl text-green-600"
          />
        </div>
      </div>
    </div>
  );
}

export default CustomIngredient;
