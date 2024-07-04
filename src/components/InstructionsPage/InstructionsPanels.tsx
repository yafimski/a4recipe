import type { RootState } from "../../state/store";
import { useSelector } from "react-redux";
import { memo } from "react";
import type { ChefInstruction } from "../../state/chefActions/chefActionsSlice";
import Instruction from "./Instruction";

interface InstructionPanelProps {
  onRefClick: (instruction: ChefInstruction) => void;
}

const InstructionsPanels = memo(({ onRefClick }: InstructionPanelProps) => {
  const chefInstructions = useSelector(
    (state: RootState) => state.actions.chefInstructions
  );

  const sortedChefInstructions = [...chefInstructions].sort((a, b) => a.id - b.id);

  return sortedChefInstructions.map((inst) => (
    <div key={inst.id} className="pt-4">
      <Instruction
        instruction={inst}
        refClick={(inst: ChefInstruction) => onRefClick(inst)}
      />
    </div>
  ));
});

export default InstructionsPanels;
