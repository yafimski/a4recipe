import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import { srcPath } from "../../utils/helpers";
import { allPossibleIngredients } from "../../utils/data";

function RecipeGroups() {
  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );

  return (
    <div className="flex flex-col center">
      {ingredientsGroups.map((group) => (
        <div
          key={group.groupName}
          className="flex flex-wrap center mb-12 group-borders-half w-10/12"
        >
          <p className="font-bold mb-4">{group.groupName}</p>
          <div className="flex flex-wrap center gap-x-10 md:gap-y-4 lg:gap-y-8">
            {group.items.map((item) => {
              const imgPath = allPossibleIngredients.includes(item.itemName)
                ? item.itemName
                : "chefhat";

              return (
                <div
                  key={`${group.groupName}_${item.itemName}`}
                  className="flex flex-row center"
                >
                  <img
                    src={`${srcPath}/assets/ingredients/${imgPath.toLowerCase()}.webp`}
                    alt={item.itemName}
                    className="print-rounded md:w-12 lg:w-28"
                  />
                  <div className="flex flex-col center w-16 ml-1">
                    <span className="md:text-xs lg:text-sm rounded-xl md:mt-1 lg:mt-1 xl:mt-2">
                      <p className="mb-2">{item.itemName}</p>
                      <p className="font-semibold">
                        {item.amount} {item.unit}
                      </p>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipeGroups;
