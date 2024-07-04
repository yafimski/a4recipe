import GoToButton from "../components/GoToButton";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
import ResetFlowButton from "../components/ResultPage/ResetFlowButton";
import RecipeGroups from "../components/ResultPage/RecipeGroups";
import RecipeInstructions from "../components/ResultPage/RecipeInstructions";
import PrintButton from "../components/ResultPage/PrintButton";

function ResultPage() {
  const recipeTitle = useSelector((state: RootState) => state.recipe.title);

  return (
    <div data-testid="resultpage" className="min-h-screen flex flex-col">
      <ResetFlowButton />
      <GoToButton page={"/instructions"} isNext={false} />
      <div className="flex flex-col center mt-12">
        <div className="relative flex flex-col a4ratio w-2/5 text-center input-border justify-start">
          <h1 className="text-fluidTitle font-shadow-light text-2xl mt-4">
            {recipeTitle}
          </h1>
          <h2 className="text-fluidCard mb-2 mt-4 font-bold">Ingredients:</h2>
          <div className="flex flex-row items-start justify-center">
            <RecipeGroups />
          </div>
          <h2 className="text-fluidCard my-2 font-bold">Steps:</h2>
          <div className="flex center">
            <div className="flex flex-col justify-start items-start">
              <RecipeInstructions />
            </div>
          </div>
          <div className="flex flex-row center mb-1">
            <h2 className="text-fluidSubtitle">Enjoy !</h2>
            <footer className="absolute right-0 mr-4 text-fluidFooter font-indie flex flex-col items-start">
              <p>*coded with love by Yafim Simanovsky</p>
              <p>https://github.com/yafimski/a4recipe</p>
            </footer>
          </div>
        </div>
      </div>
      <div className="flex center">
        <PrintButton />
      </div>
    </div>
  );
}

export default ResultPage;
