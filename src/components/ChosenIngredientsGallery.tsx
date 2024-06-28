import type { RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import type { ItemsGroup } from "../state/ingredientGroups/ingredientGroupsSlice";
import { nameGroup } from "../state/recipe/recipeSlice";
import IngredientImage from "./IngredientImage";

function ChosenIngredientsGallery() {
  const dispatch = useDispatch();

  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="p-4 overflow-auto center text-center">
      <h1 className="mb-8 text-fluidSubtitle">Selected ingredients</h1>
      {ingredientsGroups.map((group: ItemsGroup) => (
        <div key={group.groupName} className="flex flex-col center">
          <p
            onKeyDown={handleKeyDown}
            data-testid={"chosen_group"}
            onClick={() => dispatch(nameGroup(group.groupName))}
            className="text-lg bg-slate-200 w-min px-8 rounded-2xl mb-4"
          >
            {group.groupName}
          </p>
          <div className="flex flex-wrap justify-center gap-y-4 mb-10 center ">
            {group.items.map((item, i) => (
              <IngredientImage
                key={`${item}${i.toString()}`}
                groupName={group.groupName}
                itemName={item.itemName}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChosenIngredientsGallery;
