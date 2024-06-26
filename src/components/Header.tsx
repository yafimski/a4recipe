import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../state/store";
import "../index.css";
import {
  nameGroup,
  nameRecipe,
  setItem,
  updatePossibleItems,
} from "../state/recipe/recipeSlice";
import {
  type ItemsGroup,
  addItemToIngredientGroup,
} from "../state/ingredientGroups/ingredientGroupsSlice";
import { setWarning } from "../state/warning/warningSlice";
import WarningSnack from "./WarningSnack";

function Header() {
  const recipeTitle = useSelector((state: RootState) => state.recipe.title);
  const ingredientsGroups = useSelector(
    (state: RootState) => state.groups.ingredientsGroups
  );
  const currentGroupName = useSelector(
    (state: RootState) => state.recipe.currentGroupName
  );

  const currentItem = useSelector((state: RootState) => state.recipe.currentItem);
  const warning = useSelector((state: RootState) => state.warning.warning);
  const dispatch = useDispatch();

  const handleAddIngredient = (
    event: React.FormEvent<HTMLButtonElement>,
    groupName: string,
    itemName: string | null
  ) => {
    event.preventDefault();

    if (!groupName) {
      dispatch(setWarning("Ingredient group cannot be empty"));
    } else if (!itemName) {
      dispatch(setWarning("Ingredient must be selected"));
    } else {
      const existingGroup = ingredientsGroups.filter(
        (group: ItemsGroup) => group.groupName === groupName
      )[0];

      if (existingGroup) {
        const itemExists = existingGroup.items.filter(
          (item) => item.itemName === itemName
        )[0];

        if (itemExists) {
          dispatch(setWarning("Ingredient is already in the group!"));
        } else {
          const updatedData = { groupName, itemName: itemName };
          dispatch(addItemToIngredientGroup(updatedData));
        }
      }
    }
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    dispatch(setItem(val));
    dispatch(updatePossibleItems(val));
  };

  return (
    <>
      <header className="w-full h-1/4 center text-center">
        <h1 className="text-2xl pt-4">Welcome to a4recipe</h1>
        <h3 className="text-xl pt-2 pb-4">
          Name your recipe and start adding ingredients!
        </h3>
        <input
          type="text"
          required
          className="w-1/4 center input-border rounded-3xl"
          placeholder="Give your recipe a name"
          value={recipeTitle}
          onChange={(e) => dispatch(nameRecipe(e.target.value))}
        />
        <form className="p-6 pb-2">
          <input
            type="text"
            className="input-border w-1/5 mr-8"
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
            className="bg-blue-500 w-20 text-white font-semibold rounded-3xl ml-4 py-2"
            onClick={(e) => handleAddIngredient(e, currentGroupName, currentItem)}
          >
            ADD
          </button>
        </form>
      </header>
      {warning && <WarningSnack />}
    </>
  );
}

export default Header;
