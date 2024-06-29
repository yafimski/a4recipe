import type { RootState } from "../../state/store";
import { useSelector } from "react-redux";

function InstructionsPanel() {
  const chefInstructions = useSelector(
    (state: RootState) => state.actions.chefInstructions
  );

  return chefInstructions.map((inst) => (
    <div key={`${inst.action.actionName}_${inst.id}`}>{inst.action.actionName}</div>
  ));
}

export default InstructionsPanel;
