import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { defUnit, handleKeyDownPrevent } from "../../utils/helpers";
import type { RootState } from "../../state/store";
import { useState } from "react";
import AmazingGallery from "../AmazingGallery";
import CustomIngredient from "./CustomIngredient";

const IngredientGalleryItem = lazy(() => import("./IngredientGalleryItem"));

function SelectionGallery() {
  const [openGallery, setOpenGallery] = useState<boolean>(false);

  const possibleIngredients = useSelector(
    (state: RootState) => state.recipe.possibleItems
  );

  const gridClass =
    possibleIngredients.length < 5 ? "flex flex-row gap-x-8" : "grid-autofill";

  return (
    <>
      {!openGallery && (
        <div
          className="modal-open-button"
          onClick={() => setOpenGallery(true)}
          onKeyDown={handleKeyDownPrevent}
        >
          CLICK ME
          <br />
          to say "Wow"
          <br />
          and "Ooooh"
        </div>
      )}
      <AmazingGallery isOpen={openGallery} onClose={() => setOpenGallery(false)} />
      <div className="flex flex-row overflow-auto no-scrollbar justify-evenly p-2">
        <div className={`flex flex-row flex-wrap center gap-y-8 gap-x-4 ${gridClass}`}>
          {possibleIngredients.map((itemName) => (
            <Suspense
              key={`${itemName}_suspense`}
              fallback={
                <div
                  className="suspense-gallery-item"
                  data-testid={`${itemName}_suspense`}
                >
                  {""}
                </div>
              }
            >
              <IngredientGalleryItem item={{ itemName, amount: 0, unit: defUnit }} />
            </Suspense>
          ))}
          {possibleIngredients.length === 0 && <CustomIngredient />}
        </div>
      </div>
    </>
  );
}

export default SelectionGallery;
