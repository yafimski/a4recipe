import type { RootState } from "../state/store";
import { useSelector } from "react-redux";
import type { ItemsGroup } from "../state/ingredientGroups/ingredientGroupsSlice";
import UnitsPanel from "./UnitsPanel";

function UnitsSelection() {
  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );

  // const dispatch = useDispatch();
  // const recipeBatches = useSelector((state: RootState) => state.recipe.batches);

  return (
    <div className="flex flex-col justify-center">
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
      {/* <div className="flex flex-col center">
        <h3 className="text-xl pt-8 pb-4">How many batches in this recipe?</h3>
        <input
          type="number"
          required
          className="w-1/12 center input-border rounded-3xl text-center"
          placeholder="0"
          value={recipeBatches}
          onChange={(e) => dispatch(setBatches(Number.parseInt(e.target.value)))}
        />
      </div> */}
    </div>
  );
}

export default UnitsSelection;
