import type { RootState } from "../../state/store";
import { useSelector } from "react-redux";
import type { ItemsGroup } from "../../state/ingredientGroups/ingredientGroupsSlice";
import UnitsPanel from "./UnitsPanel";

function UnitsSelection() {
  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col h-5/6 w-fit input-gallery-border  overflow-auto p-4 items-center">
        <h2 className="text-fluidSubtitle mb-4">
          Select the Units and Quantities for each ingredient
        </h2>
        {ingredientsGroups.map((group: ItemsGroup) => (
          <div key={group.groupName} className="sm:mb-2 md:mb-4">
            <UnitsPanel
              key={group.groupName}
              groupName={group.groupName}
              items={group.items}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UnitsSelection;
