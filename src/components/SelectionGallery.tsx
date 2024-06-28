import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
import { Suspense, lazy } from "react";
import { defUnit } from "../utils/helpers";

const IngredientGalleryItem = lazy(() => import("./IngredientGalleryItem"));

function SelectionGallery() {
  const possibleIngredients = useSelector(
    (state: RootState) => state.recipe.possibleItems
  );

  const gridClass =
    possibleIngredients.length < 5 ? "center grid-few gap-x-8" : "grid-autofill";

  return (
    <div className={"center overflow-auto"}>
      <div className={`gap-y-8 gap-x-2 p-4 ${gridClass}`}>
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
