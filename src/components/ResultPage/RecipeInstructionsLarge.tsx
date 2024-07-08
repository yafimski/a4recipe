import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";

function RecipeInstructions() {
  const chefInstructions = useSelector(
    (state: RootState) => state.actions.chefInstructions
  );

  return chefInstructions.map((inst, index) => (
    <div
      key={`${inst.id}`}
      className="flex flex-col md:mb-2 lg:mb-6 xl:mb-10 sm:w-5/6 md:w-5/6 lg:w-4/5 xl:w-full center items-start"
    >
      <div className="relative flex flex-row md:gap-1 lg:gap-1 xl:gap-4 pointer-events-none items-center justify-start">
        <span className="instruction-print-text min-w-12">Step {index + 1}</span>
        <div className="a4scale-smaller">
          <div className="bg-white card-shadow print-rounded print-image mr-2">
            <img
              draggable="false"
              src={`../src/assets/chefActions/${inst.action.actionName.toLowerCase()}.webp`}
              alt={inst.action.actionName}
              data-testid={`${inst.action.actionName}_action`}
              className="print-rounded-img print-image"
            />
            <p className="instruction-print-text py-0.5">{inst.action.actionName}</p>
          </div>
        </div>
        <span className="instruction-print-text">THE</span>
        {inst.customItem ? (
          <b className="instruction-print-text">{inst.customItem}</b>
        ) : (
          <div className="center justify-start sm:w-20 md:w-44 lg:w-52 xl:w-56 flex flex-row flex-wrap">
            {inst.items.map((item) => (
              <div key={`${inst.id}_${item.itemName}`} className="flex center py-1 px-1">
                <img
                  src={`../src/assets/ingredients/${item.itemName.toLowerCase()}.webp`}
                  alt={item.itemName}
                  className="card-shadow print-image print-rounded"
                />{" "}
              </div>
            ))}
          </div>
        )}
        {inst.action.time !== -1 && (
          <span className="flex instruction-print-text min-w-12">
            FOR <br />
            {inst.action.time} {inst.action.unit}
          </span>
        )}
      </div>
      <span className="instruction-print-text pt-0.5 lg:pt-1">{inst.note}</span>
      <hr className="w-2/3 mt-1 mb-2 border-gray-300" />
    </div>
  ));
}

export default RecipeInstructions;
