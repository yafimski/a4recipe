import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import PrintActionFull from "./PrintActionFull";
import PrintItemImg from "./PrintItemImg";

function RecipeInstructions() {
  const chefInstructions = useSelector(
    (state: RootState) => state.actions.chefInstructions
  );

  return chefInstructions.map((inst) => (
    <div key={`${inst.id}`} className="flex flex-col steps-container mb-4">
      <div className="flex center gap-2 pointer-events-none">
        <span className="instruction-word-small mr-12">Step {inst.id + 1}</span>
        <div className="a4scale-smaller">
          <PrintActionFull actionName={inst.action.actionName} />
        </div>
        <span className="instruction-word-small">THE</span>
        {inst.customItem ? (
          <b className="instruction-word-small">{inst.customItem}</b>
        ) : (
          <div className={`${inst.items.length < 4 ? "flex" : "grid"} gap-2 p-2`}>
            <div
              className={`${inst.items.length < 4 ? "flex" : "grid grid-cols-4"} center`}
            >
              {inst.items.map((item) => (
                <div key={`${inst.id}_${item.itemName}`} className="m-1">
                  <PrintItemImg itemName={item.itemName} square={true} />
                </div>
              ))}
            </div>
          </div>
        )}
        {inst.action.time !== -1 && (
          <span className="instruction-word-small">
            FOR {inst.action.time} {inst.action.unit}
          </span>
        )}
      </div>
      <div className="flex right-0">
        <p className="instruction-word-tiny mt-2">{inst.note}</p>
      </div>
      <hr className="border-gray-300" />
    </div>
  ));
}

export default RecipeInstructions;
