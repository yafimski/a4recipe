import { useNavigate } from "react-router-dom";
import { defUnit, handleKeyDown } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setWarning } from "../state/warning/warningSlice";
import type { RootState } from "../state/store";

interface GoToButtonProps {
  page: string;
  isNext: boolean;
}

function GoToButton({ page, isNext }: GoToButtonProps) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const recipeTitle = useSelector((state: RootState) => state.recipe.title);
  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );

  const areUnitsValid = async () => {
    const allItems = ingredientsGroups.flatMap((group) => group.items.flat());

    const allItemsHaveAmount = allItems.every((item) => item.amount > 0);
    const allItemsHaveUnits = allItems.every((item) => item.unit !== defUnit);

    return allItemsHaveAmount && allItemsHaveUnits;
  };

  const handleNext = async () => {
    if (isNext) {
      let pageValid = false;
      if (page === "/quantities") {
        if (recipeTitle.length > 0 && ingredientsGroups.length > 0) {
          pageValid = true;
        }
      }

      if (page === "/instructions") {
        if (await areUnitsValid()) {
          pageValid = true;
        }
      }

      if (pageValid) {
        dispatch(setWarning(""));
        navigate(page);
      } else {
        dispatch(setWarning("You forgot to fill in some elements!"));
      }
    } else {
      dispatch(setWarning(""));
      navigate(page);
    }
  };

  return (
    <div
      data-testid={isNext ? "next" : "back"}
      onKeyDown={handleKeyDown}
      onClick={handleNext}
    >
      <button
        className={`absolute w-24 h-24 m-8 py-8 px-6 card-shadow text-white font-semibold text-lg tracking-wider rounded-full ${
          isNext
            ? "right-0 bg-green-500 hover:bg-green-400"
            : "left-0 bg-red-500 hover:bg-red-400"
        } `}
        type="button"
      >
        {isNext ? "NEXT" : "BACK"}
      </button>
    </div>
  );
}

export default GoToButton;
