import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IngredientItem,
  decrementAmount,
  incrementAmount,
  updateAmount,
} from "../state/ingredientGroups/ingredientGroupsSlice";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

interface AmountInputProps {
  item: IngredientItem;
  groupName: string;
}

function AmountInput({ item, groupName }: AmountInputProps) {
  const dispatch = useDispatch();

  const handleAmountChange = (itemName: string, amount: string) => {
    if (/^\d*\.?\d*$/.test(amount)) {
      const parsedValue = amount === "" ? 0 : Number.parseFloat(amount);
      dispatch(
        updateAmount({
          groupName,
          itemName,
          amount: parsedValue,
        })
      );
    }
  };

  const handleFocus = (e: { target: { select: () => void } }) => {
    e.target.select();
  };

  return (
    <div className="input-border rounded-md mx-6">
      <button
        type="button"
        className="ml-2"
        onClick={() => {
          if (item.amount > 0) {
            dispatch(decrementAmount({ groupName, itemName: item.itemName }));
          }
        }}
      >
        <FontAwesomeIcon icon={faMinus} className="cursor-pointer text-xl" />
      </button>
      <input
        className="w-24 focus:outline-none text-center"
        type="number"
        id="units-number-input"
        value={item.amount}
        required
        onChange={(e) => handleAmountChange(item.itemName, e.target.value)}
        onFocus={handleFocus}
        onWheel={(e) => (e.target as HTMLElement).blur()}
      />
      <button
        type="button"
        className="mr-2"
        onClick={() => {
          if (item.amount >= 0) {
            dispatch(incrementAmount({ groupName, itemName: item.itemName }));
          }
        }}
      >
        <FontAwesomeIcon icon={faPlus} className="cursor-pointer text-xl" />
      </button>
    </div>
  );
}

export default AmountInput;
