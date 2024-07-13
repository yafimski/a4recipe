import type { IngredientItem } from "../state/ingredientGroups/ingredientGroupsSlice";
import { allPossibleIngredients } from "../utils/data";
import { defUnit, srcPath } from "../utils/helpers";
import AmountInput from "./QuantitiesPage/AmountInput";

interface IngredientProp {
  groupName: string;
  item: IngredientItem;
}

function IngredientFullItem({ groupName, item }: IngredientProp) {
  const { itemName, unit } = item;

  const imgPath = allPossibleIngredients.includes(item.itemName)
    ? item.itemName
    : "chefhat";

  return (
    <div data-testid="ingredientFullItem" className="flex center">
      <div
        key={`${groupName}_${itemName}`}
        className="aspect-videoWide flex flex-row h-clampSmall rounded-2xl card-shadow"
      >
        <img
          src={`${srcPath}/assets/ingredients/${imgPath.toLowerCase()}.webp`}
          alt={itemName}
          className="rounded-l-2xl"
        />
        <div className="flex flex-col center w-1/2 md:p-0 lg:p-1 m-auto gap-1 lg:gap-0">
          <p className="md:text-sm lg:text-base">{itemName}</p>
          <hr className="hr-generic" />
          <AmountInput item={item} groupName={groupName} />
          <p
            className={`md:text-sm lg:text-base rounded-xl px-3 md:mt-1 lg:mt-0 ${
              unit === defUnit && "required-element-fill"
            }`}
          >
            {unit}
          </p>
        </div>
      </div>
    </div>
  );
}

export default IngredientFullItem;
