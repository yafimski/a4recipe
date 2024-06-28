import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  type IngredientItem,
  updateAmount,
} from "../state/ingredientGroups/ingredientGroupsSlice";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

interface AmountInputProps {
  item: IngredientItem;
  groupName: string;
}

function AmountInput({ item, groupName }: AmountInputProps) {
  const dispatch = useDispatch();
  const [localAmount, setLocalAmount] = useState<number>(item.amount);

  const handleFocus = (e: { target: { select: () => void } }) => {
    e.target.select();
  };

  const handleAmountChange = (amount: number) => {
    if (Number.isNaN(amount)) {
      setLocalAmount(0);
    } else {
      setLocalAmount(amount);
    }
  };

  const handleSubtract = () => {
    if (localAmount > 0) {
      setLocalAmount((prev) => prev - 1);
    }
  };

  const handleAdd = () => {
    setLocalAmount((prev) => prev + 1);
  };

  useEffect(() => {
    dispatch(
      updateAmount({
        groupName,
        itemName: item.itemName,
        amount: localAmount,
      })
    );
  }, [dispatch, groupName, item.itemName, localAmount]);

  return (
    <div className="flex flex-row rounded-md mx-6">
      <button type="button" className="mx-2" onClick={handleSubtract}>
        <FontAwesomeIcon icon={faMinus} className="cursor-pointer text-xl" />
      </button>
      <input
        className={`w-20 focus:outline-none text-center ${
          localAmount === 0 && "required-element-fill"
        }`}
        type="number"
        id="units-number-input"
        value={localAmount}
        required
        onChange={(e) => handleAmountChange(Number.parseFloat(e.target.value))}
        onFocus={handleFocus}
        onWheel={(e) => (e.target as HTMLElement).blur()}
      />
      <button type="button" className="mx-2" onClick={handleAdd}>
        <FontAwesomeIcon icon={faPlus} className="cursor-pointer text-xl" />
      </button>
    </div>
  );
}

export default AmountInput;
