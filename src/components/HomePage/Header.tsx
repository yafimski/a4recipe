import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import {
  type ItemsGroup,
  addItemToIngredientGroup,
  resetIngredientsGroups,
} from "../../state/ingredientGroups/ingredientGroupsSlice";
import {
  setItem,
  updatePossibleItems,
  resetRecipe,
  nameRecipe,
  nameGroup,
} from "../../state/recipe/recipeSlice";
import { setWarning } from "../../state/warning/warningSlice";
import WarningSnack from "../WarningSnack";
import { handleFocusSelect } from "../../utils/helpers";
import LoadButton from "./LoadButton";

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
        dispatch(setWarning("Too many ingredients at once!"));
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
    dispatch(resetIngredientsGroups());
  };

  return (
    <>
      <div className="relative flex flex-col w-full h-1/4 center text-center">
        <h1 className="mt-4 text-fluidTitle font-shadowsLight">Welcome to a4recipe</h1>
        <h3 className="pt-2 pb-2 text-fluidSubtitle">
          Name your recipe and start adding ingredients!
        </h3>
        <input
          type="text"
          required
          className={`w-inputs center input-border xl:w-96 ${
            recipeTitle.length === 0 && "required-element-border"
          }`}
          placeholder="Give your recipe a name"
          value={recipeTitle}
          onChange={(e) => dispatch(nameRecipe(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              (e.target as HTMLInputElement).blur();
            }
          }}
          onFocus={handleFocusSelect}
        />
        <div className="md:justify-between lg:justify-center gap-y-4">
          <form className="pt-4 pb-2">
            <div className="flex flex-row center w-full mb-4 gap-4">
              <input
                type="text"
                className="input-border text-center w-96 lg:mr-8"
                placeholder="Search ingredients"
                value={currentItem}
                onInput={handleInputChange}
                onFocus={handleFocusSelect}
              />
              <input
                type="text"
                className="input-border w-60"
                placeholder="Give them a group name"
                value={currentGroupName}
                onChange={(e) => dispatch(nameGroup(e.target.value))}
                onFocus={handleFocusSelect}
              />
            </div>
            <div className="flex flex-row justify-between">
              <button
                type="button"
                className="sexy-button bg-slate-500 hover:bg-white hover:text-slate-500 focus:text-slate-500 focus:bg-gray-200 text-gray-50"
                onClick={handleReset}
              >
                RESET
              </button>
              <LoadButton />
              <button
                form="addIngredientsSelect"
                type="submit"
                className="sexy-button bg-blue-500 hover:bg-white hover:text-blue-500 focus:text-blue-500 focus:bg-gray-200 text-gray-50"
                onClick={(e) => handleAddIngredient(e, currentGroupName, currentItem)}
              >
                ADD
              </button>
            </div>
          </form>
        </div>
      </div>
      {warning && <WarningSnack />}
    </>
  );
}

export default Header;
