import { useNavigate } from "react-router-dom";
import { handleKeyDownPrevent, srcPath } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { setWarning } from "../../state/warning/warningSlice";
import { resetRecipe } from "../../state/recipe/recipeSlice";
import { resetIngredientsGroups } from "../../state/ingredientGroups/ingredientGroupsSlice";
import { resetChefInstructions } from "../../state/chefActions/chefActionsSlice";

function ResetFlowButton() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleNext = async () => {
    dispatch(resetRecipe());
    dispatch(setWarning(""));
    dispatch(resetIngredientsGroups());
    dispatch(resetChefInstructions());
    navigate(`${srcPath}/`);
  };

  return (
    <div
      data-testid={"make_another"}
      onKeyDown={handleKeyDownPrevent}
      onClick={handleNext}
    >
      <button
        className="go-to-button-arrow right-0 py-4 bg-green-500 hover:bg-green-400 hover:-translate-y-4"
        type="button"
      >
        MAKE
        <br />
        ANOTHER
      </button>
    </div>
  );
}

export default ResetFlowButton;
