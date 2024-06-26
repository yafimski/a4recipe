import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../state/store";
import { updateUnit } from "../state/ingredientGroups/ingredientGroupsSlice";

interface UnitsButtonGroupProps {
  identifier: string;
  units: string[];
}

function UnitsButtonGroup({ identifier, units }: UnitsButtonGroupProps) {
  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );
  const dispatch = useDispatch();

  const itemName = identifier.split("_")[0];
  const groupName = identifier.split("_")[1];

  const currentItem = ingredientsGroups
    .find((g) => g.groupName === groupName)
    ?.items.filter((item) => item.itemName === itemName)[0];

  return (
    currentItem && (
      <div className="md:text-sm lg:text-md">
        {units.map((unit: string) => (
          <button
            className={`border border-solid border-blue-500 rounded-lg min-w-min px-4 py-1 mr-1 ${
              currentItem.unit === unit ? "bg-blue-300" : null
            }`}
            type="button"
            key={`${identifier}_${unit}`}
            onClick={() =>
              dispatch(
                updateUnit({
                  groupName,
                  itemName,
                  unit: unit,
                })
              )
            }
          >
            {unit}
          </button>
        ))}
      </div>
    )
  );
}

export default UnitsButtonGroup;
