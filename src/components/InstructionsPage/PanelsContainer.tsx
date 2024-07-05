import { useDroppable } from "@dnd-kit/core";
import InstructionsPanels from "./InstructionsPanels";
import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import type { ChefInstruction } from "../../state/chefActions/chefActionsSlice";

interface PanelsContainerProps {
  onInstructionClick: (instruction: ChefInstruction) => void;
}

function PanelsContainer({ onInstructionClick }: PanelsContainerProps) {
  const { setNodeRef } = useDroppable({
    id: "steps_container",
    data: {
      type: "Steps",
    },
  });

  const chefInstructions = useSelector(
    (state: RootState) => state.actions.chefInstructions
  );

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col bg-slate-50 w-full mx-8 mb-1 semi-height overflow-scroll no-scrollbar ${
        chefInstructions.length === 0
          ? "justify-center items-center"
          : "justify-start items-center pt-2"
      } md:overflow-x-auto`}
    >
      {chefInstructions.length === 0 && (
        <h2 className="text-fluidSubtitle text-gray-600">
          Drag an action <b>[ top ]</b> to this area <br />
          and start adding ingredients <b>[left ]</b> to it!
          <br />
          <br />
          To add more steps just
          <br />
          drag another action.
          <br />
          <br />
          <b>Replace an action by dragging a new one over it!</b>
        </h2>
      )}
      <InstructionsPanels
        onRefClick={(instruction: ChefInstruction) => onInstructionClick(instruction)}
      />
    </div>
  );
}

export default PanelsContainer;
