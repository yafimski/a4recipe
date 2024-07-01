import { useNavigate } from "react-router-dom";
import { handleKeyDown } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { setWarning } from "../../state/warning/warningSlice";
import { resetRecipe } from "../../state/recipe/recipeSlice";
import { resetIngredientsGroup } from "../../state/ingredientGroups/ingredientGroupsSlice";
import {
  resetChefInstructions,
  setCurrentAction,
  setCurrentInstruction,
  setCurrentItems,
} from "../../state/chefActions/chefActionsSlice";

function ResetFlowButton() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleNext = async () => {
    dispatch(resetRecipe());
    dispatch(setWarning(""));
    dispatch(resetIngredientsGroup());
    dispatch(resetChefInstructions());
    dispatch(setCurrentAction(null));
    dispatch(setCurrentItems([]));
    dispatch(setCurrentInstruction(null));
    navigate("/");
  };

  return (
    <div data-testid={"make_another"} onKeyDown={handleKeyDown} onClick={handleNext}>
      <button
        className="absolute w-24 h-24 m-8 py-8 px-6 card-shadow text-white font-semibold text-lg tracking-wider rounded-full
            right-0 bg-green-500 hover:bg-green-400"
        type="button"
      >
        MAKE ANOTHER
      </button>
    </div>
  );
}

export default ResetFlowButton;
