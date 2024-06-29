import InstructionsItems from "./InstructionsItems";
import InstructionsActions from "./InstructionsActions";
import InstructionsPanels from "./InstructionsPanels";

function ActionSteps() {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col h-5/6 w-fit input-gallery-border  overflow-auto p-4">
        <h1 className="text-fluidSubtitle mb-12">Plan how to use the ingredients!</h1>
        <div className="flex flex-row max-w-screen-lg overflow-hidden mb-12">
          <InstructionsActions />
        </div>
        <div className="flex flex-row">
          <InstructionsItems />
          <InstructionsPanels />
        </div>
      </div>
    </div>
  );
}

export default ActionSteps;
