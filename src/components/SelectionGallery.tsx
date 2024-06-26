import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
import { Suspense, lazy } from "react";

const IngredientGalleryItem = lazy(() => import("./IngredientGalleryItem"));

function SelectionGallery() {
  const possibleIngredients = useSelector(
    (state: RootState) => state.recipe.possibleItems
  );

  const isFewItems = possibleIngredients.length < 5;

  return (
    <div className={`flex-grow overflow-auto ${isFewItems ? "flex center" : ""}`}>
      <div
        className={`md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 p-8 ${
          isFewItems ? "flex h-full items-start" : "grid grid-cols-5 gap-4"
        } gap-x-12`}
      >
        {possibleIngredients.map((itemName) => (
          <Suspense
            key={itemName}
            fallback={<div className="suspenseGalleryItem">{""}</div>}
          >
            <IngredientGalleryItem
              key={itemName}
              groupName={""}
              item={{ itemName, amount: 0, unit: "none" }}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
}

export default SelectionGallery;
