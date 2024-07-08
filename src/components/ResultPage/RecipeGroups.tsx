import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import { srcPath } from "../../utils/helpers";

function RecipeGroups() {
  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );

  return ingredientsGroups.map((group) => {
    return (
      <div
        key={group.groupName}
        className="flex flex-row center md:gap-x-3 lg:gap-x-4 mb-2"
      >
        <p className="text-fluidSubtitle leading-none  md:mr-2 lg:mr-4">
          {group.groupName}
        </p>
        {group.items.map((item) => (
          <div
            key={`${group.groupName}_${item.itemName}`}
            className="flex flex-col h-fit center md:rounded-md lg:rounded-lg"
          >
            <img
              src={`${srcPath}/assets/ingredients/${item.itemName.toLowerCase()}.webp`}
              alt={item.itemName}
              className="card-shadow md:w-tinyImage lg:w-miniImage md:rounded-md lg:rounded-lg"
            />
            <div className="py-2 h-fit">
              <p className="text-fluidPrintTitle leading-tight px-2">{item.itemName}</p>
              <p className="text-fluidPrintTitle leading-tight">
                <b>
                  {item.amount}&nbsp;&nbsp;{item.unit}
                </b>
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  });
}

export default RecipeGroups;
