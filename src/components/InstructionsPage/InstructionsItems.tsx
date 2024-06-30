import type { RootState } from "../../state/store";
import { useSelector } from "react-redux";
import type { ItemsGroup } from "../../state/ingredientGroups/ingredientGroupsSlice";
import InstructionsItem from "./InstructionsItem";
import { handleKeyDown } from "../../utils/helpers";

function InstructionsItems() {
  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );

  return ingredientsGroups.map((group: ItemsGroup, i) => (
    <div key={`${group.groupName}_${i}`} className="mb-12">
      {group.items.map((item) => (
        <div
          key={`${group.groupName}_${item.itemName}`}
          onKeyDown={handleKeyDown}
          className="mb-4"
        >
          <InstructionsItem groupName={group.groupName} item={item} />
        </div>
      ))}
    </div>
  ));
}

export default InstructionsItems;
