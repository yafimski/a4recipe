import GoToButton from "../components/GoToButton";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
import PrintButton from "../components/ResultPage/PrintButton";
import ResetFlowButton from "../components/ResultPage/ResetFlowButton";
import RecipeGroupsLarge from "../components/ResultPage/RecipeGroupsLarge";
import RecipeInstructionsLarge from "../components/ResultPage/RecipeInstructionsLarge";

function DoublePrint() {
  const recipeTitle = useSelector((state: RootState) => state.recipe.title);

  return (
    <div data-testid="doubleResultpage" className="relative min-h-screen flex flex-col">
      <ResetFlowButton />
      <GoToButton page={"/instructions"} isNext={false} />
      <div className="flex flex-row center gap-x-8 mt-28 mb-16">
        <div
          id="a4_1"
          className="relative flex flex-col a4ratio w-1/3 text-center input-border items-center"
        >
          <h1 className="recipe-title">{recipeTitle}</h1>
          <h2 className="recipe-subtitle-text mb-1">page 1</h2>
          <hr className="w-1/2 border-gray-200 md:mb-2 lg:mb-4" />
          <h2 className="recipe-subtitle-text sm:mb-2 md:mb-4 lg:mb-8">Ingredients:</h2>
          <div className="flex flex-col justify-center">
            <RecipeGroupsLarge />
          </div>
        </div>

        <div
          id="a4_2"
          className="relative flex flex-col a4ratio w-1/3 text-center input-border items-center"
        >
          <h1 className="recipe-title">{recipeTitle}</h1>
          <h2 className="recipe-subtitle-text mb-1">page 2</h2>
          <hr className="w-1/2 border-gray-200 mb-2" />
          <h2 className="recipe-subtitle-text lg:mb-1 xl:mb-4">Steps:</h2>
          <div className="flex flex-col justify-center">
            <div className="flex flex-col center">
              <RecipeInstructionsLarge />
            </div>
          </div>
          <h2 className="recipe-subtitle-text mb-2">Enjoy !</h2>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 go-to-button-arrow mb-0">
        <PrintButton />
      </div>
    </div>
  );
}

export default DoublePrint;
