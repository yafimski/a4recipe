import { useDispatch, useSelector } from "react-redux";
import type { ItemsGroup } from "../../state/ingredientGroups/ingredientGroupsSlice";
import type { RootState } from "../../state/store";
import ChosenGroupItems from "./ChosenGroupItems";
import { nameGroup } from "../../state/recipe/recipeSlice";
import { handleKeyDownPrevent } from "../../utils/helpers";

function ChosenGroups() {
  const dispatch = useDispatch();
  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );

  return ingredientsGroups.map((group: ItemsGroup, index: number) => (
    <div key={`${group.groupName}_${index}`} className="flex flex-col center">
      <p
        onKeyDown={handleKeyDownPrevent}
        data-testid={"chosen_group"}
        onClick={() => dispatch(nameGroup(group.groupName))}
        className="group-chip text-fluidSubtitle"
      >
        {group.groupName}
      </p>
      <ChosenGroupItems group={group} />
    </div>
  ));
}

export default ChosenGroups;
