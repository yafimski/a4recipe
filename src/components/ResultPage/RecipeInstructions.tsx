import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";

function RecipeInstructions() {
  const chefInstructions = useSelector(
    (state: RootState) => state.actions.chefInstructions
  );

  return chefInstructions.map((inst, index) => (
    <div key={`${inst.id}`} className="flex flex-col md:mb-2 lg:mb-6 md:w-5/6 lg:w-3/5 ">
      <div className="relative flex flex-row gap-4 pointer-events-none items-center justify-start ">
        <span className="md:text-xs lg:text-sm min-w-12">Step {index + 1}</span>
        <div>
          <div className="bg-white card-shadow print-rounded w-tinyImage mr-2">
            <img
              draggable="false"
              src={`../src/assets/chefActions/${inst.action.actionName.toLowerCase()}.webp`}
              alt={inst.action.actionName}
              data-testid={`${inst.action.actionName}_action`}
              className="print-rounded-img w-tinyImage"
            />
            <p className="md:text-xs lg:text-sm py-0.5">{inst.action.actionName}</p>
          </div>
        </div>
        <span className=" md:text-xs lg:text-sm">THE</span>
        {inst.customItem ? (
          <b className="md:text-xs lg:text-sm">{inst.customItem}</b>
        ) : (
          <div className="center justify-start md:w-44 lg:min-w-48  flex flex-row flex-wrap">
            {inst.items.map((item) => (
              <div key={`${inst.id}_${item.itemName}`} className="flex center py-1 px-2">
                <img
                  src={`../src/assets/ingredients/${item.itemName.toLowerCase()}.webp`}
                  alt={item.itemName}
                  className="card-shadow md:w-10 lg:w-12 print-rounded-img"
                />{" "}
              </div>
            ))}
          </div>
        )}
        {inst.action.time !== -1 && (
          <span className="-bggreen-300 md:text-xs lg:text-sm min-w-12 md:-ml-4">
            FOR <br />
            {inst.action.time} {inst.action.unit}
          </span>
        )}
      </div>
      <div className="flex w-full left-0">
        <span className="md:text-xs lg:text-sm md:pt-0.5 lg:pt-1">{inst.note}</span>
      </div>
      <hr className="border-gray-300" />
    </div>
  ));
}

export default RecipeInstructions;
