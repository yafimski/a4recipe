import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import {
  nameGroup,
  nameRecipe,
  resetRecipe,
  setItem,
  updatePossibleItems,
} from "../state/recipe/recipeSlice";
import {
  type ItemsGroup,
  addItemToIngredientGroup,
  resetIngredientGroup,
} from "../state/ingredientGroups/ingredientGroupsSlice";
import { setWarning } from "../state/warning/warningSlice";
import WarningSnack from "./WarningSnack";
import type { RootState } from "../state/store";

function Header() {
  const dispatch = useDispatch();
  const possibleItems = useSelector((state: RootState) => state.recipe.possibleItems);
  const currentGroupName = useSelector(
    (state: RootState) => state.recipe.currentGroupName
  );
  const currentItem = useSelector((state: RootState) => state.recipe.currentItem);
  const recipeTitle = useSelector((state: RootState) => state.recipe.title);
  const warning = useSelector((state: RootState) => state.warning.warning);
  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );

  const handleAddIngredient = (
    event: React.FormEvent<HTMLButtonElement>,
    groupName: string,
    itemName: string | null
  ) => {
    event.preventDefault();

    if (!groupName) {
      dispatch(setWarning("Enter a group name!"));
    } else if (!itemName) {
      dispatch(setWarning("Search an ingredient!"));
    } else {
      if (possibleItems.length === 0) {
        dispatch(setWarning("No items found!"));
      } else if (possibleItems.length === 1) {
        const existingGroup = ingredientsGroups.filter(
          (group: ItemsGroup) => group.groupName === groupName
        )[0];

        if (existingGroup) {
          const existingItem = existingGroup.items.filter(
            (item) => item.itemName === possibleItems[0]
          )[0];

          if (existingItem) {
            dispatch(setWarning("Ingredient is already in the group!"));
          } else {
            const updatedData = { groupName, itemName: possibleItems[0] };
            dispatch(addItemToIngredientGroup(updatedData));
          }
        } else {
          const updatedData = { groupName, itemName: possibleItems[0] };
          dispatch(addItemToIngredientGroup(updatedData));
        }
      } else {
        dispatch(setWarning("Too many ingredients found!"));
      }
    }
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    dispatch(setItem(val));
    dispatch(updatePossibleItems(val));
  };

  const handleReset = () => {
    dispatch(resetRecipe());
    dispatch(resetIngredientGroup());
  };

  return (
    <>
      <div className="w-full h-1/4 center text-center">
        <h1 className="pt-6 text-fluidTitle">Welcome to a4recipe</h1>
        <h3 className="text-xl pt-2 pb-4 text-fluidSubtitle">
          Name your recipe and start adding ingredients!
        </h3>
        <input
          type="text"
          required
          className={`w-1/4 center input-border rounded-3xl ${
            recipeTitle.length === 0 && "required-element-border"
          }`}
          placeholder="Give your recipe a name"
          value={recipeTitle}
          onChange={(e) => dispatch(nameRecipe(e.target.value))}
        />
        <form className="p-6 pb-4">
          <button
            type="button"
            className="bg-gray-200 w-20 text-black rounded-3xl mr-16 py-2 card-shadow"
            onClick={handleReset}
          >
            RESET
          </button>
          <input
            type="text"
            className="input-border w-96 mr-8"
            placeholder="Search ingredient"
            value={currentItem}
            onInput={handleInputChange}
          />
          <input
            type="text"
            className="input-border w-60"
            placeholder="Give them a group name"
            value={currentGroupName}
            onChange={(e) => dispatch(nameGroup(e.target.value))}
          />
          <button
            form="addIngredientsSelect"
            type="submit"
            className="bg-blue-500 w-20 text-white font-semibold rounded-3xl ml-4 py-2 card-shadow"
            onClick={(e) => handleAddIngredient(e, currentGroupName, currentItem)}
          >
            ADD
          </button>
        </form>
      </div>
      {warning && <WarningSnack />}
    </>
  );
}

export default Header;
