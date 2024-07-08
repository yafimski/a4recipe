import type { IngredientItem } from "../state/ingredientGroups/ingredientGroupsSlice";
import { defUnit, srcPath } from "../utils/helpers";
import AmountInput from "./QuantitiesPage/AmountInput";

interface IngredientProp {
  groupName: string;
  item: IngredientItem;
}

function IngredientFullItem({ groupName, item }: IngredientProp) {
  const { itemName, unit } = item;

  return (
    <div data-testid="ingredientFullItem" className="flex center">
      <div
        key={`${groupName}_${itemName}`}
        className="aspect-videoWide flex flex-row h-clampSmall rounded-2xl card-shadow"
      >
        <img
          src={`${srcPath}/assets/ingredients/${itemName.toLowerCase()}.webp`}
          alt={itemName}
          className="rounded-l-2xl"
        />
        <div className="flex flex-col center w-1/2 p-2 m-auto lg:gap-1">
          <p className="text-fluidSubtitle">{itemName}</p>
          <hr className="w-full border-gray-400 lg:my-2" />
          <AmountInput item={item} groupName={groupName} />
          <p
            className={`text-fluidSubtitle rounded-xl px-3 ${
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