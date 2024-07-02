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
    if (!currentGroupName) {
      dispatch(setWarning("Ingredient group cannot be empty"));
    } else {
      const itemExists = ingredientsGroups
        .filter((group: ItemsGroup) => group.groupName === currentGroupName)[0]
        ?.items.filter((item) => item.itemName === itemName)[0];

      if (itemExists) {
        dispatch(setWarning("Ingredient is already in the group!"));
      } else {
        dispatch(addItemToIngredientGroup({ groupName: currentGroupName, itemName }));
      }
    }
  };

  return (
    <div className="flex flex-row" data-testid={`${itemName}_gallery`}>
      <div className="relative flex flex-col rounded-2xl card-shadow w-cw aspect-video-reverse">
        <img
          src={`../src/assets/ingredients/${itemName.toLowerCase()}.webp`}
          alt={itemName}
          className="rounded-t-2xl"
        />
        <div className="absolute inset-0 flex center bg-white rounded-2xl bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity">
          <FontAwesomeIcon
            icon={faCirclePlus}
            onClick={() => handleAddItemFromIngredients()}
            className="cursor-pointer text-4xl text-green-600"
          />
        </div>
        <p className="flex flex-grow rounded-b-2xl center px-4 text-center sm:text-fluidCard">
          {itemName}
        </p>
      </div>
    </div>
  );
}

export default IngredientGalleryItem;
