import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  type IngredientItem,
  updateAmount,
} from "../../state/ingredientGroups/ingredientGroupsSlice";
import { handleFocusSelect } from "../../utils/helpers";

interface AmountInputProps {
  item: IngredientItem;
  groupName: string;
}

function AmountInput({ item, groupName }: AmountInputProps) {
  const dispatch = useDispatch();
  const [localAmount, setLocalAmount] = useState<number>(item.amount);

  const handleAmountChange = (amount: number) => {
    if (amount >= 0) {
      setLocalAmount(amount);
    }
  };

  const handleSubtract = () => {
    if (localAmount > 0) {
      dispatch(
        updateAmount({
          groupName,
          itemName: item.itemName,
          amount: localAmount - 1,
        })
      );

      setLocalAmount((prev) => prev - 1);
    }
  };

  const handleAdd = () => {
    dispatch(
      updateAmount({
        groupName,
        itemName: item.itemName,
        amount: localAmount + 1,
      })
    );

    setLocalAmount((prev) => prev + 1);
  };

  const handleBlur = (amount: number) => {
    if (Number.isNaN(amount)) {
      setLocalAmount(0);
    } else if (amount >= 0) {
      setLocalAmount(amount);
    }

    dispatch(
      updateAmount({
        groupName,
        itemName: item.itemName,
        amount: amount,
      })
    );
  };

  const handleKeyDownBlur = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur(localAmount);

      dispatch(
        updateAmount({
          groupName,
          itemName: item.itemName,
          amount: localAmount,
        })
      );
    } else if (e.key === "Backspace") {
      if ((e.target as HTMLInputElement).value.length === 1) {
        setLocalAmount(0);
        dispatch(
          updateAmount({
            groupName,
            itemName: item.itemName,
            amount: 0,
          })
        );
      }
    }
  };

  return (
    <div className="flex flex-row rounded-md mx-6">
      <button type="button" className="mx-2" onClick={handleSubtract}>
        <FontAwesomeIcon icon={faMinus} className="num-input-icons" />
      </button>
      <input
        className={`w-16 p-0 py-1 focus:outline-none text-center font-roboto rounded-xl ${
          localAmount === 0 && "required-element-fill"
        }`}
        type="number"
        id="units-number-input"
        value={localAmount}
        required
        onChange={(e) => handleAmountChange(Number.parseFloat(e.target.value))}
        onFocus={handleFocusSelect}
        onBlur={(e) => handleBlur(Number.parseFloat(e.target.value))}
        onKeyDown={handleKeyDownBlur}
        onWheel={(e) => (e.target as HTMLElement).blur()}
      />
      <button type="button" className="mx-2" onClick={handleAdd}>
        <FontAwesomeIcon icon={faPlus} className="num-input-icons" />
      </button>
    </div>
  );
}

export default AmountInput;
