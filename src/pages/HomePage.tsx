import Header from "../components/HomePage/Header";
import SelectionGallery from "../components/HomePage/SelectionGallery";
import ChosenIngredientsGallery from "../components/HomePage/ChosenIngredientsGallery";
import GoToButton from "../components/GoToButton";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";

function HomePage() {
  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );

  return (
    <div data-testid="homepage" className="min-h-screen flex flex-col">
      <GoToButton page={"/quantities"} isNext={true} />
      <Header />
      <div className="flex flex-grow p-4 gap-8 mx-4">
        <div className="main-gallery w-3/5">
          <SelectionGallery />
        </div>
        <div
          className={`main-gallery w-2/5 ${
            ingredientsGroups.length === 0 && "required-element-border"
          }`}
        >
          <ChosenIngredientsGallery />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
