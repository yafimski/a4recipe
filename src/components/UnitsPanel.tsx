import { commonUnits, extraUnits } from "../utils/data";
import UnitsButtonGroup from "./UnitsButtonGroup";
import {
  type ItemsGroup,
  type IngredientItem,
  updateUnit,
} from "../state/ingredientGroups/ingredientGroupsSlice";
import { useDispatch } from "react-redux";
import AmountInput from "./AmountInput";
import IngredientFullItem from "./IngredientFullItem";

function UnitsPanel({ groupName, items }: ItemsGroup) {
  const dispatch = useDispatch();

  const handleExtraUnitsChange = (itemName: string, unit: string) => {
    dispatch(updateUnit({ groupName, itemName, unit }));
  };

  return (
    <div className="flex flex-col center">
      <p className="text-lg bg-slate-200 px-8 rounded-2xl mb-4">{groupName}</p>
      {items.map((item: IngredientItem) => (
        <div key={`${groupName}_${item.itemName}}`} className="flex flex-row center mb-8">
          <IngredientFullItem
            key={`${groupName}_${item.itemName}_${item.amount}_${item.unit}}`}
            groupName={groupName}
            item={item}
          />
          <AmountInput item={item} groupName={groupName} />
          <div className="flex flex-col justify-start gap-y-2">
            <UnitsButtonGroup
              identifier={`${item.itemName}_${groupName}_common1`}
              units={commonUnits.slice(0, commonUnits.length / 2 + 1)}
            />
            <UnitsButtonGroup
              identifier={`${item.itemName}_${groupName}_common2`}
              units={commonUnits.slice(commonUnits.length / 2 + 1)}
            />
          </div>
          <form className="ml-8">
            <select
              className={`w-28 input-border rounded-md px-2 py-1 ${
                extraUnits.includes(item.unit) ? "bg-blue-300" : null
              }`}
              value={extraUnits.includes(item.unit) ? item.unit : ""}
              onChange={(e) => handleExtraUnitsChange(item.itemName, e.target.value)}
            >
              {extraUnits.map((unit: string) => (
                <option key={unit}>{unit}</option>
              ))}
            </select>
          </form>
        </div>
      ))}
    </div>
  );
}

export default UnitsPanel;
