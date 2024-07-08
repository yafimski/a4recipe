import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";

function RecipeGroups() {
  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );

  return ingredientsGroups.map((group) => {
    return (
      <div
        key={group.groupName}
        className="flex flex-row items-center justify-between md:gap-x-1 lg:gap-x-2 sm:mb-1 md:mb-2 lg:mb-3 xl:mb-4"
      >
        <p className="group-chip-dead text-fluidPrintSubtitle leading-none px-1 mr-4 sm:max-w-6 md:max-w-8 lg:max-w-10 xl:max-w-12">
          {group.groupName}
        </p>
        <div className="flex flex-row items-start sm:gap-1 md:gap-2 lg:gap-3">
          {group.items.map((item) => (
            <div
              key={`${group.groupName}_${item.itemName}`}
              className="flex flex-col center print-rounded"
            >
              <img
                src={`../src/assets/ingredients/${item.itemName.toLowerCase()}.webp`}
                alt={item.itemName}
                className="card-shadow print-rounded print-image"
              />
              <div className="py-2 h-fit">
                <p className="text-fluidPrintSubtitle leading-tight max-w-6">
                  {item.itemName}
                </p>
                <p className="text-fluidPrintSubtitle leading-tight ">
                  <b>
                    {item.amount}&nbsp;&nbsp;{item.unit}
                  </b>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  });
}

export default RecipeGroups;
