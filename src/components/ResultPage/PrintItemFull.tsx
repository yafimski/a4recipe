import type { IngredientItem } from "../../state/ingredientGroups/ingredientGroupsSlice";
import PrintItemImg from "./PrintItemImg";

interface IngredientProp {
  groupName: string;
  item: IngredientItem;
}

function IngredientFullItem({ groupName, item }: IngredientProp) {
  const { itemName, amount, unit } = item;

  return (
    <div data-testid="ingredientFullItem" className="flex center">
      <div
        key={`${groupName}_${itemName}`}
        className="aspect-videoWide flex flex-row rounded-md card-shadow"
      >
        <img
          src={`../src/assets/ingredients/${itemName.toLowerCase()}.webp`}
          alt={itemName}
          className="h-smallImage"
        />
        <div className="flex flex-col center w-full p-1">
          <p className="mini-text">{itemName}</p>
          <hr className="w-2/3 border-gray-400 py-1" />
          <p className="mini-text">{amount}</p>
          <p className="mini-text">{unit}</p>
        </div>
      </div>
    </div>
  );
}

export default IngredientFullItem;
