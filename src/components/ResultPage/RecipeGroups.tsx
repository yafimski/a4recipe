import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import IngredientImage from "../IngredientImage";

function RecipeGroups() {
  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );

  return ingredientsGroups.map((group) => (
    <div key={group.groupName} className="mx-4 center flex flex-col">
      <p className="bg-slate-200 w-fit px-8 rounded-2xl mb-1">{group.groupName}</p>
      <div className="flex flex-row flex-wrap center mb-12">
        {group.items.map((item) => (
          <div key={item.itemName} className="m-2">
            <IngredientImage
              groupName={group.groupName}
              itemName={item.itemName}
              allowRemove={false}
              size={"sm"}
            />
          </div>
        ))}
      </div>
    </div>
  ));
}

export default RecipeGroups;
