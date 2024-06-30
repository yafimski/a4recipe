import InstructionsItems from "./InstructionsItems";
import InstructionsActions from "./InstructionsActions";
import InstructionsPanels from "./InstructionsPanels";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import { addChefInstruction } from "../../state/chefActions/chefActionsSlice";

function ActionSteps() {
  const dispatch = useDispatch();
  const chefInstructions = useSelector(
    (state: RootState) => state.actions.chefInstructions
  );

  const currentAction = useSelector((state: RootState) => state.actions.currentAction);

  const currentItems = useSelector((state: RootState) => state.actions.currentItems);

  const handleAddInstruction = () => {
    console.log("handleAddInstruction called");

    if (currentAction !== null && currentItems.length > 0) {
      dispatch(
        addChefInstruction({
          id:
            chefInstructions.length > 0
              ? Math.max(...chefInstructions.map((inst) => inst.id)) + 1
              : 0,
          action: currentAction,
          items: currentItems,
        })
      );
    }
  };

  const buttonDisabled = currentAction === null || currentItems.length === 0;

  return (
    <div className="mt-12 h-5/6 w-2/3 input-gallery-border overflow-auto p-4 bg-slate-200">
      <h1 className="text-fluidSubtitle mb-4">Plan how to use the ingredients!</h1>
      <div className="flex flex-col center">
        <div className="flex w-full overflow-x-scroll mb-8 p-2 pl-4 bg-green-400">
          <InstructionsActions />
        </div>
        <div className="flex w-full">
          <div className="ml-4 w-fit bg-red-300">
            <InstructionsItems />
          </div>
          <div className="w-full ml-4 p-4 bg-blue-300">
            <InstructionsPanels />
          </div>
        </div>
        <button
          type="button"
          disabled={buttonDisabled}
          className={`bg-blue-500 w-40 mt-12 font-semibold rounded-3xl ml-4 py-2 card-shadow ${
            buttonDisabled ? "bg-gray-300 text-gray-400 shadow-none" : "text-white"
          }`}
          onClick={() => handleAddInstruction()}
        >
          Add Instruction
        </button>
      </div>
    </div>
  );
}

export default ActionSteps;
