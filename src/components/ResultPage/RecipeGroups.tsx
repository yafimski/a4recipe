import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import PrintItemFull from "./PrintItemFull";

function RecipeGroups() {
  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );

  return ingredientsGroups.map((group) => (
    <div key={group.groupName} className="flex flex-col center">
      <p className="font-indie w-fit px-4 rounded-2xl text-md">{group.groupName}</p>
      <div className="flex flex-row flex-wrap center rounded-2xl mb-4 px-2 recipe-group-border w-9/12">
        {group.items.map((item) => (
          <div key={item.itemName} className="m-1">
            <PrintItemFull groupName={group.groupName} item={item} />
          </div>
        ))}
      </div>
    </div>
  ));
}

export default RecipeGroups;
