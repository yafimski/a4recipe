import Header from "../components/Header";
import SelectionGallery from "../components/SelectionGallery";
import ChosenIngredientsGallery from "../components/ChosenIngredientsGallery";
import GoToButton from "../components/GoToButton";

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <GoToButton page={"/quantities"} isNext={true} />
      <Header />
      <div className="flex flex-grow p-4 gap-8 mx-4">
        <div className="main-gallery">
          <SelectionGallery />
        </div>
        <div className="main-gallery">
          <ChosenIngredientsGallery />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
