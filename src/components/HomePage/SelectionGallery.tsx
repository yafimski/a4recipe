import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { defUnit } from "../../utils/helpers";
import type { RootState } from "../../state/store";

const IngredientGalleryItem = lazy(() => import("./IngredientGalleryItem"));

function SelectionGallery() {
  const possibleIngredients = useSelector(
    (state: RootState) => state.recipe.possibleItems
  );

  const gridClass =
    possibleIngredients.length < 5 ? "flex flex-row gap-x-8" : "grid-autofill";

  return (
    <div className="flex flex-row overflow-auto no-scrollbar p-4  justify-evenly">
      <div className={`flex flex-row flex-wrap center gap-y-8 gap-x-4 ${gridClass}`}>
        {possibleIngredients.map((itemName) => (
          <Suspense
            key={`${itemName}_suspense`}
            fallback={
              <div className="suspense-gallery-item" data-testid={`${itemName}_suspense`}>
                {""}
              </div>
            }
          >
            <IngredientGalleryItem item={{ itemName, amount: 0, unit: defUnit }} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}

export default SelectionGallery;
