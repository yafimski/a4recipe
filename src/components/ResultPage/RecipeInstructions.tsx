import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import ActionImage from "../ActionImage";
import IngredientImage from "../IngredientImage";

function RecipeInstructions() {
  const chefInstructions = useSelector(
    (state: RootState) => state.actions.chefInstructions
  );

  return chefInstructions.map((inst) => (
    <div key={`${inst.id}`} className="flex flex-col center mb-8">
      <div className="flex pl-16">
        <div className="flex center w-full">
          <div className="py-2 a4scale">
            <ActionImage action={inst.action} allowRemove={false} />
          </div>
          <span>THE</span>
          <div className="flex">
            {inst.items.map((item) => (
              <div key={`${inst.id}_${item.itemName}`} className=" a4scale">
                <IngredientImage
                  groupName={inst.id.toString()}
                  itemName={item.itemName}
                  allowRemove={false}
                />
              </div>
            ))}
          </div>
          {inst.action.time !== -1 && (
            <div className="flex center">
              <span>
                FOR {inst.action.time} {inst.action.unit}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex center">
        <p>{inst.note}</p>
      </div>
    </div>
  ));
}

export default RecipeInstructions;
