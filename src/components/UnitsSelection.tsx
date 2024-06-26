import type { RootState } from "../state/store";
import { useSelector } from "react-redux";
import type { ItemsGroup } from "../state/ingredientGroups/ingredientGroupsSlice";
import UnitsPanel from "./UnitsPanel";

function UnitsSelection() {
  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );

  return (
    <div className="flex flex-col h-5/6 w-fit input-gallery-border  overflow-auto p-4 items-center">
      <h1 className="text-xl mb-8">Select the Unit for each ingredient</h1>
      {ingredientsGroups.map((group: ItemsGroup) => (
        <div key={group.groupName} className="mb-4">
          <UnitsPanel
            key={group.groupName}
            groupName={group.groupName}
            items={group.items}
          />
        </div>
      ))}
    </div>
  );
}

export default UnitsSelection;
