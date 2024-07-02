import type { IngredientItem } from "../state/ingredientGroups/ingredientGroupsSlice";
import { defUnit } from "../utils/helpers";
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
        className="aspect-video-wide flex flex-row full-image rounded-2xl card-shadow"
      >
        <img
          src={`../src/assets/ingredients/${itemName.toLowerCase()}.webp`}
          alt={itemName}
          className="rounded-l-2xl"
        />
        <div className="flex flex-col center w-1/2 p-2 m-auto gap-1">
          <p className="text-md font-indie ">{itemName}</p>
          <hr className="w-full border-gray-400 my-2" />
          <AmountInput item={item} groupName={groupName} />
          <p
            className={`text-lg font-indie rounded-xl px-3 ${
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
