import GoToButton from "../components/GoToButton";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
import PrintButton from "../components/ResultPage/PrintButton";
import RecipeGroups from "../components/ResultPage/RecipeGroups";
import RecipeInstructions from "../components/ResultPage/RecipeInstructions";
import ResetFlowButton from "../components/ResultPage/ResetFlowButton";

function PrintPage() {
  const recipeTitle = useSelector((state: RootState) => state.recipe.title);

  let pageRatio = 0;
  const page = document.querySelector("#a4");
  if (page) {
    pageRatio = page.getBoundingClientRect().width / page.getBoundingClientRect().height;
  }

  return (
    <div data-testid="resultpage" className="relative min-h-screen flex flex-col">
      <ResetFlowButton />
      <span
        className={`absolute top-1/3 left-0 ml-12 font-bold ${
          pageRatio > 0.709 && pageRatio < 0.7095 ? "text-green-600" : "text-red-600"
        }`}
      >
        {pageRatio}
      </span>
      <GoToButton page={"/instructions"} isNext={false} />
      <div className="flex flex-col center mt-28 mb-16">
        <div
          id="a4"
          className="relative flex flex-col a4ratio w-2/3 text-center input-border justify-between"
        >
          <div className="flex flex-col h-fit justify-between items-center">
            <h1 className="text-fluidTitle font-shadowsLight md:mt-2 lg:mt-4">
              {recipeTitle}
            </h1>
            <hr className="w-1/2 border-gray-200 md:mb-2 lg:mb-4" />
            <h2 className="text-fluidSubtitle mb-2">Ingredients:</h2>
          </div>
          <div className="grid grid-rows-3 h-2/5">
            <RecipeGroups />
          </div>
          <div className="h-fit justify-between items-center">
            <h2 className="text-fluidSubtitle md:mt-2 lg:mt-8">Steps:</h2>
          </div>
          <div className="flex flex-col items-center justify-start h-3/5 md:mt-1 lg:mt-2">
            <RecipeInstructions />
          </div>
          <div className="flex flex-col bg-yellow-200 h-fit justify-between items-center pb-2">
            <h2 className="text-fluidSubtitle">Enjoy !</h2>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 go-to-button-arrow mb-0">
        <PrintButton />
      </div>
    </div>
  );
}

export default PrintPage;
