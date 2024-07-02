import { useDispatch, useSelector } from "react-redux";
import {
  removeItemFromIngredientGroup,
  type ItemsGroup,
} from "../../state/ingredientGroups/ingredientGroupsSlice";
import { nameGroup } from "../../state/recipe/recipeSlice";
import IngredientImage from "../IngredientImage";
import type { RootState } from "../../state/store";
import { handleKeyDownPrevent } from "../../utils/helpers";

function ChosenIngredientsGallery() {
  const dispatch = useDispatch();

  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );
  const handleRemoveItemFromIngredients = (groupName: string, itemName: string) => {
    dispatch(removeItemFromIngredientGroup({ groupName, itemName }));
  };

  return (
    <div className="px-4 pb-4 overflow-auto center text-center no-scrollbar">
      <h2 className="mb-8 text-2xl font-indie">Selected ingredients</h2>
      {ingredientsGroups.map((group: ItemsGroup) => (
        <div key={group.groupName} className="flex flex-col center">
          <p
            onKeyDown={handleKeyDownPrevent}
            data-testid={"chosen_group"}
            onClick={() => dispatch(nameGroup(group.groupName))}
            className="group-chip"
          >
            {group.groupName}
          </p>
          <div className="flex flex-wrap justify-center gap-y-4 mb-12 center">
            {group.items.map((item, i) => (
              <div key={`${item}${i.toString()}`} className="mx-2 hover:scale-105">
                <IngredientImage
                  groupName={group.groupName}
                  itemName={item.itemName}
                  allowRemove={true}
                  onRemove={() =>
                    handleRemoveItemFromIngredients(group.groupName, item.itemName)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChosenIngredientsGallery;
