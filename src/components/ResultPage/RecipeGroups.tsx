import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import PrintItemFull from "./PrintItemFull";

function RecipeGroups() {
  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );

  return ingredientsGroups.map((group) => (
    <div key={group.groupName} className="flex flex-col flex-wrap center mx-4">
      <p className="font-indie rounded-2xl text-md">{group.groupName}</p>
      <div className="flex flex-col rounded-2xl  recipe-group-border w-full py-2 px-3">
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
