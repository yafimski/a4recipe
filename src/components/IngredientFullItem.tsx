import type { IngredientItem } from "../state/ingredientGroups/ingredientGroupsSlice";
import AmountInput from "./AmountInput";

interface IngredientProp {
  groupName: string;
  item: IngredientItem;
}

function IngredientFullItem({ groupName, item }: IngredientProp) {
  const { itemName, unit } = item;

  return (
    <div className="flex center">
      <div
        key={`${groupName}_${itemName}`}
        className="flex flex-row w-72 h-32 rounded-2xl card-shadow"
      >
        <img
          src={`../src/assets/${itemName.toLowerCase()}.webp`}
          alt={itemName}
          className="rounded-l-2xl"
        />
        <div className="flex flex-col center w-1/2 p-2 m-auto gap-1">
          <p className="text-sm">{itemName}</p>
          <hr className="w-full border-gray-400 my-2" />
          <AmountInput item={item} groupName={groupName} />
          <p className="text-md font-semibold">{unit}</p>
        </div>
      </div>
    </div>
  );
}

export default IngredientFullItem;
