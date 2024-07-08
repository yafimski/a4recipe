import { useDroppable } from "@dnd-kit/core";
import InstructionsPanels from "./InstructionsPanels";
import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import type { ChefInstruction } from "../../state/chefActions/chefActionsSlice";
import { useCallback, useEffect, useRef } from "react";

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

  const containerRef = useRef<HTMLDivElement | null>(null);
  const prevChefInstructionsLength = useRef<number>(chefInstructions.length);

  const handleInstructionScroll = useCallback(() => {
    const actionsScrollbar = containerRef.current;
    if (chefInstructions.length === 0) return;

    const lastInstruction = chefInstructions[chefInstructions.length - 1];
    const targetAction = actionsScrollbar?.querySelector(
      `[data-instruction="${lastInstruction.id}"]`
    );

    if (targetAction) {
      targetAction.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [chefInstructions]);

  useEffect(() => {
    if (chefInstructions.length !== prevChefInstructionsLength.current) {
      handleInstructionScroll();
      prevChefInstructionsLength.current = chefInstructions.length;
    }
  }, [chefInstructions, handleInstructionScroll]);

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        containerRef.current = node;
      }}
      className={`flex flex-col bg-slate-50 w-full md:ml-4 lg:ml-8 mb-1 max-h-semi overflow-scroll no-scrollbar ${
        chefInstructions.length === 0
          ? "justify-center items-center"
          : "justify-start items-center pt-2"
      } lg:overflow-x-auto`}
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
