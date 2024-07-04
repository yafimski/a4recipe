import { useNavigate } from "react-router-dom";
import { defUnit, handleKeyDownPrevent } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setWarning } from "../state/warning/warningSlice";
import type { RootState } from "../state/store";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    const allInstructionsHaveItems = chefInstructions.every(
      (inst) => inst.items.length > 0
    );

    const allRelevantInstructionsHaveTime = chefInstructions.every(
      (inst) => inst.action.time !== 0
    );

    return (
      chefInstructions.length > 0 &&
      allInstructionsHaveItems &&
      allRelevantInstructionsHaveTime
    );
  };

  const handleNext = async () => {
    if (isNext) {
      let pageValid = false;
      let warningText = "";

      if (page === "/quantities") {
        if (recipeTitle.length > 0 && ingredientsGroups.length > 0) {
          pageValid = true;
        } else {
          warningText = "Title and ingredients must be selected!";
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

      if (page === "/result") {
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
      navigate(page);
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
          <FontAwesomeIcon icon={faArrowRight} className="text-xl ml-4" />
        </button>
      ) : (
        <button
          className="go-to-button-arrow left-0 bg-red-500 hover:bg-red-400 hover:-translate-x-4"
          type="button"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-xl mr-4" />
          BACK
        </button>
      )}
    </div>
  );
}

export default GoToButton;
