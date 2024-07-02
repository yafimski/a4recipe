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
        <div className="flex flex-col a4ratio w-2/5 text-center input-border">
          <h1 className="text-fluidTitle font-shadow-light mb-2 bg-yellow-300">
            {recipeTitle}
          </h1>
          <h2 className="text-fluidSubtitle bg-yellow-200">Ingredients:</h2>
          <div className="flex flex-wrap p-2 w-fit items-start justify-center">
            <RecipeGroups />
          </div>
          <h2 className="text-fluidSubtitle mt-2 bg-yellow-200">Steps:</h2>
          <div className="a4scale flex flex-col center items-center">
            <RecipeInstructions />
          </div>
          <h2 className="text-fluidSubtitle bg-yellow-200">Enjoy !</h2>
          <footer className="text-fluidFooter font-indie flex flex-col items-start p-4">
            <p>*coded with love by Yafim Simanovsky</p>
            <p>https://github.com/yafimski/a4recipe</p>
          </footer>
        </div>
      </div>
      <div className="flex center">
        <PrintButton />
      </div>
    </div>
  );
}

export default ResultPage;
