import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import {
  type ItemsGroup,
  addItemToIngredientGroup,
  resetIngredientsGroup,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { handleFocusSelect } from "../../utils/helpers";

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
    dispatch(resetIngredientsGroup());
  };

  return (
    <>
      <div className="w-full h-1/4 center text-center">
        <h1 className="pt-6 text-fluidTitle font-shadow-light ">Welcome to a4recipe</h1>
        <h3 className="pt-2 pb-4 text-fluidSubtitle font-indie">
          Name your recipe and start adding ingredients!
        </h3>
        <input
          type="text"
          required
          className={`w-1/4 center input-border ${
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
        <form className="p-6 pb-4">
          <button
            type="button"
            className="mr-24 sexy-button bg-slate-500 hover:bg-white hover:text-slate-500 focus:text-slate-500 focus:bg-gray-200 text-gray-50"
            onClick={handleReset}
          >
            RESET
          </button>
          <>
            <FontAwesomeIcon
              icon={faSearch}
              color="rgba(0,0,0,0.3)"
              size="1x"
              className="relative -mx-6"
            />
            <input
              type="text"
              className="input-border text-center w-96 mr-8"
              placeholder="Search ingredients"
              value={currentItem}
              onInput={handleInputChange}
              onFocus={handleFocusSelect}
            />
          </>
          <input
            type="text"
            className="input-border w-60"
            placeholder="Give them a group name"
            value={currentGroupName}
            onChange={(e) => dispatch(nameGroup(e.target.value))}
            onFocus={handleFocusSelect}
          />
          <button
            form="addIngredientsSelect"
            type="submit"
            className="ml-8 sexy-button bg-blue-500 hover:bg-white hover:text-blue-500 focus:text-blue-500 focus:bg-gray-200 text-gray-50"
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
