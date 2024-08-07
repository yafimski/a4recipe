import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import { srcPath } from "../../utils/helpers";
import { allPossibleIngredients } from "../../utils/data";

function RecipeInstructions() {
  const chefInstructions = useSelector(
    (state: RootState) => state.actions.chefInstructions
  );

  return (
    <div className="flex flex-col center">
      {chefInstructions.map((inst, index) => (
        <div key={`${inst.id}`} className="flex flex-col center items-start w-fit mb-8">
          <div className="relative flex flex-row md:gap-2 lg:gap-4 pointer-events-none center">
            <span className="print-small-text mr-4 font-bold">Step {index + 1}</span>
            <div>
              <div className="bg-white card-shadow print-rounded w-fullImage">
                <img
                  draggable="false"
                  src={`${srcPath}/assets/chefActions/${inst.action.actionName}.webp`}
                  alt={inst.action.actionName}
                  data-testid={`${inst.action.actionName}_action`}
                  className="print-rounded-img w-fullImage"
                />
                <p className="print-small-text text-center">{inst.action.actionName}</p>
              </div>
            </div>
            <span className="print-small-text">THE</span>
            {inst.customItem ? (
              <b className="print-small-text">{inst.customItem}</b>
            ) : (
              <div className="center justify-start flex flex-row flex-wrap max-w-52 lg:max-w-80 md:gap-y-1 lg:gap-y-2">
                {inst.items.map((item) => {
                  const imgPath = allPossibleIngredients.includes(item.itemName)
                    ? item.itemName
                    : "chefhat";

                  return (
                    <div
                      key={`${inst.id}_${item.itemName}`}
                      className="flex center py-1 px-2"
                    >
                      <img
                        src={`${srcPath}/assets/ingredients/${imgPath.toLowerCase()}.webp`}
                        alt={item.itemName}
                        className="card-shadow w-12 lg:w-20 print-rounded"
                      />
                    </div>
                  );
                })}
              </div>
            )}
            {inst.action.time !== -1 && (
              <span className="print-small-text">
                FOR <br />
                {inst.action.time} {inst.action.unit}
              </span>
            )}
          </div>
          <div className="flex w-full">
            <span className="print-small-text mt-2">{inst.note}</span>
          </div>
          <hr className="hr-generic" />
        </div>
      ))}
    </div>
  );
}

export default RecipeInstructions;
