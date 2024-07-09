import Header from "../components/HomePage/Header";
import SelectionGallery from "../components/HomePage/SelectionGallery";
import ChosenIngredientsGallery from "../components/HomePage/ChosenIngredientsGallery";
import GoToButton from "../components/GoToButton";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
import Social from "../components/HomePage/Social";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";

function HomePage() {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );

  return windowWidth < 768 ? (
    <div className="h-screen flex flex-col center">
      <p className="flex w-1/2 text-center xs:text-base sm:text-xl md:text-2xl">
        For the best experience,
        <br />
        <br />
        Please open this website on a tablet or laptop :)
      </p>
    </div>
  ) : (
    <div data-testid="homepage" className="max-h-screen flex flex-col">
      <GoToButton page={"/quantities"} isNext={true} />
      <Header />
      <div className="flex flex-grow md:p-2 lg:p-2 sm:gap-4 md:gap-4 lg:gap-8 mx-4">
        <div className="main-gallery sm:w-2/3 md:w-4/5 lg:w-3/5">
          <SelectionGallery />
        </div>
        <div
          className={`main-gallery sm:w-1/3 w-2/5 ${
            ingredientsGroups.length === 0 && "required-element-border"
          }`}
        >
          <ChosenIngredientsGallery />
        </div>
      </div>
      <div className="absolute top-0 left-0 m-4">
        <Social link="https://www.linkedin.com/in/yafimsimanovsky/" icon={faLinkedin} />
        <Social link="https://github.com/yafimski/a4recipe" icon={faGithub} />
      </div>
    </div>
  );
}

export default HomePage;
