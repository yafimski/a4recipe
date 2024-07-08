import { commonUnits, extraUnits } from "../../utils/data";
import UnitsButtonGroup from "./UnitsButtonGroup";
import {
  type IngredientItem,
  updateUnit,
} from "../../state/ingredientGroups/ingredientGroupsSlice";
import { useDispatch } from "react-redux";
import IngredientFullItem from "../IngredientFullItem";

interface UnitsPanelProps {
  groupName: string;
  items: IngredientItem[];
}

function UnitsPanel({ groupName, items }: UnitsPanelProps) {
  const dispatch = useDispatch();

  const handleExtraUnitsChange = (item: IngredientItem, unit: string) => {
    dispatch(updateUnit({ groupName, itemName: item.itemName, unit }));
  };

  return (
    <div className="flex flex-col items-start mx-8">
      <p className="group-chip-dead">{groupName}</p>
      {items.map((item: IngredientItem) => (
        <div key={`${groupName}_${item.itemName}}`} className="flex flex-row center mb-8">
          <IngredientFullItem
            key={`${groupName}_${item.itemName}_${item.amount}_${item.unit}}`}
            groupName={groupName}
            item={item}
          />
          <div
            data-testid="unitsButtonsArray"
            className="flex flex-col justify-start md:gap-y-2 sm:mx-6 md:mx-12 lg:mx-8"
          >
            <UnitsButtonGroup
              identifier={`${item.itemName}_${groupName}_common1`}
              units={commonUnits.slice(0, commonUnits.length / 2)}
            />
            <UnitsButtonGroup
              identifier={`${item.itemName}_${groupName}_common2`}
              units={commonUnits.slice(commonUnits.length / 2)}
            />
          </div>
          <form>
            <select
              className={`text-base md:w-20 lg:w-28 input-border rounded-md px-2 py-1 ${
                extraUnits.includes(item.unit)
                  ? "border-blue-500 border-1 bg-blue-300"
                  : null
              }`}
              value={item.unit}
              onChange={(e) => handleExtraUnitsChange(item, e.target.value)}
            >
              {extraUnits.map((unit: string) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </form>
        </div>
      ))}
    </div>
  );
}

export default UnitsPanel;
