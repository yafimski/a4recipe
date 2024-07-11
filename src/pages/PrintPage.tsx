import GoToButton from "../components/GoToButton";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
import RecipeGroups from "../components/ResultPage/RecipeGroups";
import RecipeInstructions from "../components/ResultPage/RecipeInstructions";
import ResetFlowButton from "../components/ResultPage/ResetFlowButton";
import SaveButton from "../components/ResultPage/SaveButton";
import BatchInput from "../components/ResultPage/BatchInput";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

function PrintPage() {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true,
  });

  const recipeTitle = useSelector((state: RootState) => state.recipe.title);

  return (
    <div data-testid="printpage" className="relative min-h-screen flex flex-col">
      <ResetFlowButton />
      <GoToButton page={"/instructions"} isNext={false} />
      <div className="flex flex-col center mt-28 mb-16">
        <div
          id="printpage"
          className="relative flex flex-col w-2/3 text-center input-border"
        >
          <div className="relative" ref={componentRef}>
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
                <h2 className="print-subtitle z-10 bg-white px-6 mb-4">Steps:</h2>
                <hr className="hr-long" />
              </div>
              <RecipeInstructions />
              <div className="flex flex-col h-fit justify-between items-center pb-2">
                <h2 className="print-subtitle">Enjoy !</h2>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 text-fluidPrintSubtitle m-2">
              <p>made with love by Yafim Simanovsky</p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="font-indie"
                href="https://github.com/yafimski/a4recipe"
              >
                https://github.com/yafimski/a4recipe
              </a>
              <hr className="w-full mt-1" />
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <button type="button" className="fixed print-button" onClick={handlePrint}>
          <span className="print-tooltip">
            If the print looks weird try to play with the paper size and custom scale :)
          </span>
          PRINT
          <br />
          THIS OUT !
        </button>
      </div>
      <SaveButton />
    </div>
  );
}

export default PrintPage;
