import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { RootState } from "../../state/store";
import { setBatches } from "../../state/recipe/recipeSlice";
import { updateAllmounts } from "../../state/ingredientGroups/ingredientGroupsSlice";

function BatchInput() {
  const dispatch = useDispatch();
  const batches = useSelector((state: RootState) => state.recipe.batches);

  const [localBatch, setLocalBatch] = useState<number>(batches);

  const handleFocus = (e: { target: { select: () => void } }) => {
    e.target.select();
  };

  const handleTimeChange = (batch: number) => {
    if (Number.isNaN(batch)) {
      dispatch(updateAllmounts({ batch: 1, divider: localBatch }));
      setLocalBatch(1);
    } else {
      dispatch(updateAllmounts({ batch, divider: localBatch }));
      setLocalBatch(batch);
    }
  };

  useEffect(() => {
    dispatch(setBatches(localBatch));
  }, [dispatch, localBatch]);

  return (
    <div className="relative mb-12">
      <div className="flex flex-col center rounded-md mx-2">
        <p className="text-xl"># of batches</p>
        <input
          className={`sm:w-6 md:w-6 lg:w-12 p-0 md:mx-2 lg:mx-4 focus:outline-none text-center rounded-2xl sm:text-xl  md:text-2xl lg:text-3xl bg-transparent border-2 border-transparent hover:border-neutral-500 hover:border-2 ${
            localBatch === 0 && "required-element-fill"
          }`}
          type="number"
          id="units-number-input"
          value={localBatch}
          required
          onChange={(e) => handleTimeChange(Number.parseFloat(e.target.value))}
          onFocus={handleFocus}
          onWheel={(e) => (e.target as HTMLElement).blur()}
        />
      </div>
    </div>
  );
}

export default BatchInput;
