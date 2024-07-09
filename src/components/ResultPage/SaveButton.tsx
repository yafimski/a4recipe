import { handleKeyDownPrevent } from "../../utils/helpers";
import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";

function SaveButton() {
  const recipe = useSelector((state: RootState) => state.recipe);
  const groups = useSelector((state: RootState) => state.groups);
  const actions = useSelector((state: RootState) => state.actions);
  const warning = useSelector((state: RootState) => state.warning);

  const handleSaveState = () => {
    const stateToSave = {
      recipe: { ...recipe, possibleItems: [] },
      groups,
      actions,
      warning,
    };

    const stateJson = JSON.stringify(stateToSave);
    const blob = new Blob([stateJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${recipe.title}_recipe.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div data-testid={"save"} onKeyDown={handleKeyDownPrevent} onClick={handleSaveState}>
      <button type="button" className="save-button">
        Save
        <br />
        for later
      </button>
    </div>
  );
}

export default SaveButton;
