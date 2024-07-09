import GoToButton from "../components/GoToButton";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
import PrintButton from "../components/ResultPage/PrintButton";
import RecipeGroups from "../components/ResultPage/RecipeGroups";
import RecipeInstructions from "../components/ResultPage/RecipeInstructions";
import ResetFlowButton from "../components/ResultPage/ResetFlowButton";
import SaveButton from "../components/ResultPage/SaveButton";
import BatchInput from "../components/ResultPage/BatchInput";

function PrintPage() {
  const recipeTitle = useSelector((state: RootState) => state.recipe.title);

  return (
    <div data-testid="resultpage" className="relative min-h-screen flex flex-col">
      <ResetFlowButton />
      <GoToButton page={"/instructions"} isNext={false} />
      <div className="flex flex-col center mt-28 mb-16">
        <div
          id="printpage"
          className="relative flex flex-col w-2/3 text-center input-border"
        >
          <div className="flex flex-col h-fit justify-between items-center">
            <div className="flex flex-col center w-full">
              <h1 className="print-title mt-8">{recipeTitle}</h1>
              <hr className="hr-generic w-2/3" />
              <BatchInput />

              <div className="relative flex center">
                <h2 className="print-subtitle z-10 bg-white px-6">Ingredients:</h2>
                <hr className="hr-long" />
              </div>
            </div>
            <RecipeGroups />
          </div>

          <div className="flex flex-col h-fit justify-between items-center">
            <div className="relative flex center">
              <h2 className="print-subtitle z-10 bg-white px-6">Steps:</h2>
              <hr className="hr-long" />
            </div>
            <RecipeInstructions />
            <div className="flex flex-col h-fit justify-between items-center pb-2">
              <h2 className="print-subtitle">Enjoy !</h2>
            </div>
          </div>
        </div>
      </div>

      <PrintButton />
      <SaveButton />
    </div>
  );
}

export default PrintPage;
