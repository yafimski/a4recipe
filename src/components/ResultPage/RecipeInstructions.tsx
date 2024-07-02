import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import IngredientImage from "../IngredientImage";
import ActionImageWithName from "../ActionImageWithName";

function RecipeInstructions() {
  const chefInstructions = useSelector(
    (state: RootState) => state.actions.chefInstructions
  );

  return chefInstructions.map((inst) => (
    <div key={`${inst.id}`} className="center">
      <div className="flex center justify-start gap-2 max-w-11/12 p-2 bg-green-300">
        <ActionImageWithName
          action={inst.action}
          allowRemove={false}
          chosenAction={null}
          onClickAction={() => console.log("")}
        />
        <span className="instruction-word-small">THE</span>
        {inst.items.map((item) => (
          <div key={`${inst.id}_${item.itemName}`} className="m-1">
            <IngredientImage
              groupName={inst.id.toString()}
              itemName={item.itemName}
              allowRemove={false}
              size="sm"
            />
          </div>
        ))}
        {inst.action.time !== -1 && (
          <span className="instruction-word-small">
            FOR {inst.action.time} {inst.action.unit}
          </span>
        )}
      </div>
      <p className="instruction-word-small mb-4">{inst.note}</p>
    </div>
  ));
}

export default RecipeInstructions;
