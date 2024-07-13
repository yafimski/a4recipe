import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import {
  type IngredientItem,
  type ItemsGroup,
  addItemToIngredientGroup,
} from "../../state/ingredientGroups/ingredientGroupsSlice";
import { setWarning } from "../../state/warning/warningSlice";
import type { RootState } from "../../state/store";
import { handleKeyDownPrevent, srcPath } from "../../utils/helpers";
import { allPossibleIngredients } from "../../utils/data";

function IngredientGalleryItem({ item }: { item: IngredientItem }) {
  const { itemName } = item;

  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );

  const currentGroupName = useSelector(
    (state: RootState) => state.recipe.currentGroupName
  );

  const dispatch = useDispatch();

  const handleAddItemFromIngredients = () => {
    const groupDefault = currentGroupName || "All";

    const itemExists = ingredientsGroups
      .filter((group: ItemsGroup) => group.groupName === groupDefault)[0]
      ?.items.filter((item) => item.itemName === itemName)[0];

    if (itemExists) {
      dispatch(setWarning("Ingredient is already in the group!"));
    } else {
      dispatch(addItemToIngredientGroup({ groupName: groupDefault, itemName }));
    }
  };

  const imgPath = allPossibleIngredients.includes(item.itemName)
    ? item.itemName
    : "chefhat";

  return (
    <div className="flex flex-row" data-testid={`${itemName}_gallery`}>
      <div className="relative flex flex-col print-rounded card-shadow w-cw aspect-videoReverse">
        <img
          src={`${srcPath}/assets/ingredients/${imgPath.toLowerCase()}.webp`}
          alt={itemName}
          className="print-rounded-img"
        />
        <div
          className="absolute inset-0 flex center bg-white print-rounded bg-opacity-70 opacity-0 hover:opacity-100 hover:cursor-pointer transition-opacity"
          onClick={() => handleAddItemFromIngredients()}
          onKeyDown={handleKeyDownPrevent}
        >
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="cursor-pointer text-4xl text-green-600"
          />
        </div>
        <p className="flex flex-grow rounded-b-2xl center px-4 text-center text-fluidPrintTitle">
          {itemName}
        </p>
      </div>
    </div>
  );
}

export default IngredientGalleryItem;
