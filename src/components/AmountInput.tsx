import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IngredientItem,
  updateAmount,
} from "../state/ingredientGroups/ingredientGroupsSlice";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useState } from "react";

interface AmountInputProps {
  item: IngredientItem;
  groupName: string;
}

function AmountInput({ item, groupName }: AmountInputProps) {
  const dispatch = useDispatch();
  // const batches = useSelector((state: RootState) => state.recipe.batches);

  // useEffect(() => {
  //   if (batches >= 1) setLocalAmount((prev) => prev * batches);
  // }, [batches]);

  const [localAmount, setLocalAmount] = useState<number>(item.amount);

  const handleFocus = (e: { target: { select: () => void } }) => {
    e.target.select();
  };

  const handleAmountChange = (amount: number) => {
    setLocalAmount(amount);
  };

  const handleSubtract = () => {
    if (localAmount > 0) {
      setLocalAmount((prev) => prev - 1);
    }
  };

  const handleUpdateAmount = () => {
    dispatch(
      updateAmount({
        groupName,
        itemName: item.itemName,
        amount: localAmount,
      })
    );
  };

  return (
    <div className="flex flex-row rounded-md mx-6">
      <button type="button" className="ml-2" onClick={handleSubtract}>
        <FontAwesomeIcon icon={faMinus} className="cursor-pointer text-xl" />
      </button>
      <input
        className="w-20 focus:outline-none text-center"
        type="number"
        id="units-number-input"
        value={localAmount}
        required
        onChange={(e) => handleAmountChange(Number.parseFloat(e.target.value))}
        onFocus={handleFocus}
        onWheel={(e) => (e.target as HTMLElement).blur()}
        onBlur={handleUpdateAmount}
      />
      <button
        type="button"
        className="mr-2"
        onClick={() => setLocalAmount((prev) => prev + 1)}
      >
        <FontAwesomeIcon icon={faPlus} className="cursor-pointer text-xl" />
      </button>
    </div>
  );
}

export default AmountInput;
