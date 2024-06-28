import type { RootState } from "../state/store";
import { useSelector } from "react-redux";
import type { ItemsGroup } from "../state/ingredientGroups/ingredientGroupsSlice";
import IngredientImage from "./IngredientImage";

function ActionSteps() {
  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col h-5/6 w-fit input-gallery-border  overflow-auto p-4 items-center">
        <h1 className="text-fluidSubtitle mb-8">Plan how to use the ingredients!</h1>
        {ingredientsGroups.map((group: ItemsGroup, i) => (
          <div key={`${group.groupName}_${i}`} className="mb-4">
            {group.items.map((item) => (
              <IngredientImage
                key={`${group.groupName}_${item.itemName}`}
                groupName={group.groupName}
                itemName={item.itemName}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActionSteps;
