import { useDispatch } from "react-redux";
import { setRecipe } from "../../state/recipe/recipeSlice";
import { setIngredientsGroups } from "../../state/ingredientGroups/ingredientGroupsSlice";
import { setChefInstructions } from "../../state/chefActions/chefActionsSlice";

function LoadButton() {
  const dispatch = useDispatch();

  const handleLoadState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const json = e.target?.result as string;
        const newState = JSON.parse(json);
        dispatch(setRecipe(newState.recipe));
        dispatch(setIngredientsGroups(newState.groups));
        dispatch(setChefInstructions(newState.actions));
      };
      reader.onerror = (e) => {
        console.error("FileReader error", e);
      };
      reader.readAsText(file);
    }

    event.target.value = "";
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="card-shadow rounded-xl text-black bg-red-300 hover:bg-white hover:text-red-300 focus:text-red-300 focus:bg-gray-200 px-4 py-1.5 font-indie"
      >
        Load file
        <input
          id="load-state-input"
          type="file"
          accept="application/json"
          onChange={handleLoadState}
          className="absolute inset-0 opacity-0 m-0 p-0"
        />
      </button>
    </div>
  );
}

export default LoadButton;
