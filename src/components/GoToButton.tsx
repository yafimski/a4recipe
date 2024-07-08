import { useNavigate } from "react-router-dom";
import { defUnit, handleKeyDownPrevent } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setWarning } from "../state/warning/warningSlice";
import type { RootState } from "../state/store";
import { setAvailableItems } from "../state/chefActions/chefActionsSlice";

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

  const chefInstructions = useSelector(
    (state: RootState) => state.actions.chefInstructions
  );

  const areUnitsValid = async () => {
    const allItems = ingredientsGroups.flatMap((group) => group.items.flat());

    const allItemsHaveAmount = allItems.every((item) => item.amount > 0);
    const allItemsHaveUnits = allItems.every((item) => item.unit !== defUnit);

    return allItemsHaveAmount && allItemsHaveUnits;
  };

  const areInstructionsValid = async () => {
    const allInstructionsHaveItemsOrCustomIngredient = chefInstructions.every(
      (inst) => inst.items.length > 0 || inst.customItem
    );

    const allRelevantInstructionsHaveTime = chefInstructions.every(
      (inst) => inst.action.time !== 0
    );

    return (
      chefInstructions.length > 0 &&
      allInstructionsHaveItemsOrCustomIngredient &&
      allRelevantInstructionsHaveTime
    );
  };

  const handleNext = async () => {
    console.log("Current location:", location.pathname); // Debugging log to check current path
    console.log("Navigating to:", page); // Debugging log to check the page value

    if (isNext) {
      let pageValid = false;
      let warningText = "";

      if (page === "/quantities") {
        if (recipeTitle.length > 0 && ingredientsGroups.length > 0) {
          pageValid = true;
        } else {
          warningText = "You must have a Recipe Title and ingredients!";
        }
      }

      if (page === "/instructions") {
        if (await areUnitsValid()) {
          pageValid = true;

          const allItems = ingredientsGroups.flatMap((group) => group.items.flat());
          dispatch(setAvailableItems(allItems));
        } else {
          warningText = "Fill in all quantities and units!";
        }
      }

      if (page === "/print" || page === "/doublePrint") {
        if (await areInstructionsValid()) {
          pageValid = true;
        } else {
          warningText = "Create some instructions with ingredients!";
        }
      }

      if (pageValid) {
        dispatch(setWarning(""));
        navigate(page);
      } else {
        dispatch(setWarning(warningText));
      }
    } else {
      dispatch(setWarning(""));
      console.log("Replacing path to:", page);
      navigate(page, { replace: true });
    }
  };

  return (
    <div
      data-testid={isNext ? "next" : "back"}
      onKeyDown={handleKeyDownPrevent}
      onClick={handleNext}
    >
      {isNext ? (
        <button
          className="go-to-button-arrow right-0 bg-green-500 hover:bg-green-400 hover:translate-x-4"
          type="button"
        >
          NEXT
        </button>
      ) : (
        <button
          className="go-to-button-arrow left-0 bg-red-500 hover:bg-red-400 hover:-translate-x-4"
          type="button"
        >
          BACK
        </button>
      )}
    </div>
  );
}

export default GoToButton;
